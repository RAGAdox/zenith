import { useAuth, useUser } from "@clerk/clerk-react";
import { IRoute } from "@zenith/types";
import { useEffect } from "react";
import { createBrowserRouter, RouteObject, RouterProvider } from "react-router";
import { Loader } from "./components/Loader";
import useSSE from "./hooks/useSSE";
import { RootLayout } from "./layouts";
import ErrorBoundary from "./layouts/error-boundary";
import ROUTES from "./routes";

interface ProtectedRouteProps {
  route: IRoute;
}

const ProtectedRoute = ({ route }: ProtectedRouteProps) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const role = user?.publicMetadata["role"] as string | undefined;

  if (!isLoaded) {
    return <Loader />;
  }

  if (route.requireAuthentication) {
    if (!isSignedIn) {
      throw new Response(null, { status: 401 });
    } else if (
      route.requiredRole &&
      role &&
      !route.requiredRole.includes(role)
    ) {
      throw new Response(null, { status: 403 });
    }
  }
  const Element = route.element;
  return <Element />;
};

const Router = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const { triggerSSE, closeSSE } = useSSE();
  const router = createBrowserRouter([
    {
      element: <RootLayout />,
      errorElement: (
        <RootLayout>
          <ErrorBoundary />
        </RootLayout>
      ),
      children: [
        ...ROUTES.map(
          (route: IRoute): RouteObject => ({
            path: route.path,
            element: <ProtectedRoute route={route} />,
          })
        ),
      ],
    },
  ]);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      triggerSSE();
    }
    return () => {
      closeSSE();
    };
  }, [isLoaded, isSignedIn]);

  return <RouterProvider router={router} />;
};

export default Router;
