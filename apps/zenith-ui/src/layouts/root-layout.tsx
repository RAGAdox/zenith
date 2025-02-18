import { AppShell, ZenithProvider } from "@zenith/components";
import { ReactNode, useEffect } from "react";
import { Link, Outlet } from "react-router";
import { useAbly, useFetch } from "../hooks";
import CART_STORE, {
  addToCart,
  removeFromCart,
  setTable,
} from "../store/cartStore";

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
  const { ably, isAblyLoaded, clientId } = useAbly();

  /* Get tableId for loggedIn user */
  useFetch("table", {
    method: "GET",
    isProtectedApi: true,
    executeOnMount: true,
    onSuccessCallback(data) {
      if (data && data.tableId) {
        setTable(data.tableId);
      }
    },
  });

  /* get Cart Details already stored */
  useFetch("cart", {
    method: "GET",
    isProtectedApi: true,
    executeOnMount: true,
    onSuccessCallback(data) {
      Object.keys(data).map((itemId) =>
        addToCart(parseInt(itemId), data[itemId])
      );
    },
  });

  const tableId = CART_STORE((store) => store.tableId);
  useEffect(() => {
    if (isAblyLoaded && tableId) {
      const cartChanel = ably.channels.get(`cart:${tableId}`);

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
  }, [isAblyLoaded, tableId]);
  return (
    <ZenithProvider linkComponent={RouterLink}>
      <AppShell enableSearch>{children ? children : <Outlet />}</AppShell>
    </ZenithProvider>
  );
};

export default RootLayout;
