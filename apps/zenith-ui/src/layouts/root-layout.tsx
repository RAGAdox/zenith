import { SignOutButton, useAuth } from "@clerk/clerk-react";
import {
  AppShell,
  Button,
  Link as ZenithLink,
  ZenithProvider,
} from "@zenith/components";
import { ReactNode, useEffect } from "react";
import { Link, Outlet } from "react-router";
import { useAbly, useFetch } from "../hooks";
import { addToCart, removeFromCart, setCart } from "../store/cartStore";

interface RouterLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  href: string;
}

const RouterLink = ({ children, href, ...props }: RouterLinkProps) => {
  return (
    <Link to={href} {...props}>
      {children}
    </Link>
  );
};

const RootLayout = ({ children }: { children?: ReactNode }) => {
  const { isSignedIn } = useAuth();
  const { ably, isAblyLoaded, clientId } = useAbly();

  /* Get tableId for loggedIn user */
  const { data: tableData } = useFetch("table", {
    method: "GET",
    isProtectedApi: true,
    executeOnMount: true,
  });

  /* get Cart Details already stored */
  useFetch("cart", {
    method: "GET",
    isProtectedApi: true,
    executeOnMount: true,
    onSuccessCallback(data) {
      setCart(data);
    },
  });

  useEffect(() => {
    if (isAblyLoaded && tableData?.tableId) {
      const cartChanel = ably.channels.get(`cart:${tableData.tableId}`);

      cartChanel.subscribe("push", (message) => {
        if (message.clientId !== clientId) {
          addToCart(message.data.id, message.data.customizationIds);
        }
      });
      cartChanel.subscribe("pop", (message) => {
        if (message.clientId !== clientId) {
          removeFromCart(message.data.id);
        }
      });
    }
  }, [isAblyLoaded, tableData]);

  const SecondaryElement = tableData?.tableId ? (
    <Button variant="navlink">
      <ZenithLink href="/menu">Menu</ZenithLink>
    </Button>
  ) : (
    <Button variant="navlink">
      <ZenithLink href="/table">Reserve</ZenithLink>
    </Button>
  );

  const SideBarLinks = [
    ...(isSignedIn
      ? [
          {
            href: "/profile",
            display: "Profile",
          },
          {
            href: "/cart",
            display: "Cart",
          },
          {
            href: "/song",
            display: "Now Playing",
          },
        ]
      : [
          {
            href: "sign-in",
            display: "Sign Up / Login",
          },
        ]),
  ];

  const SignOut = isSignedIn ? (
    <SignOutButton>
      <Button variant="navlink">Sign out</Button>
    </SignOutButton>
  ) : (
    <></>
  );

  return (
    <ZenithProvider linkComponent={RouterLink}>
      <AppShell
        secondaryElement={SecondaryElement}
        sideBarLink={SideBarLinks}
        signOutComponent={SignOut}
        enableSearch
      >
        {children ? children : <Outlet />}
      </AppShell>
    </ZenithProvider>
  );
};

export default RootLayout;
