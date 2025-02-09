import { useUser } from "@clerk/clerk-react";
import {
  BrowserRouter,
  isRouteErrorResponse,
  Route,
  Routes,
  useRouteError,
} from "react-router";
import { Loader } from "./components/Loader";
import { RootLayout } from "./layouts";
import ROUTES from "./routes";

function ErrorBoundary() {
  console.log("In Error Boundary");
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <div>This page doesn't exist!</div>;
    }

    if (error.status === 401) {
      return <div>You aren't authorized to see this</div>;
    }

    if (error.status === 503) {
      return <div>Looks like our API is down</div>;
    }

    if (error.status === 418) {
      return <div>🫖</div>;
    }
  }

  return <div>Something went wrong</div>;
}

const App = () => {
  const { isLoaded, isSignedIn } = useUser();

  const checkAccess = ({ requireAuthentication }: IRoute) => {
    let hasAccess = true;
    if (requireAuthentication) {
      if (!isSignedIn) {
        hasAccess = false;
      }
    }
    return hasAccess;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />} errorElement={<ErrorBoundary />}>
          {isLoaded ? (
            ROUTES.map((route: IRoute, index: number) => {
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    checkAccess(route) ? (
                      <route.element></route.element>
                    ) : (
                      <>NO ACCESS</>
                    )
                  }
                  loader={() => {
                    console.log("Loader executed");
                    if (route.path === "/profile") {
                      console.log("Throwing");
                      throw new Error("Unable to load");
                    }
                    return { data: "Test Data" };
                  }}
                />
              );
            })
          ) : (
            <Route path="*" element={<Loader />} />
          )}
          <Route path="*" element={<>Not Found</>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
