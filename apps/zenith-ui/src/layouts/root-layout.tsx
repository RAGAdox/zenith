import { AppShell, ZenithProvider } from "@zenith/components";
import { ReactNode, useEffect } from "react";
import { Link, Outlet } from "react-router";
import { useAbly } from "../hooks";
import CART_STORE, { addToCart, removeFromCart } from "../store/cartStore";

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
  const tableId = CART_STORE((store) => store.tableId);
  useEffect(() => {
    if (isAblyLoaded && tableId) {
      const cartChanel = ably.channels.get(`cart:${tableId}`, {
        params: { rewind: "1440m" },
      });
      console.log("Subscriped to ", tableId);
      cartChanel.subscribe("push", (message) => {
        if (message.clientId !== clientId) {
          console.log(message.clientId, clientId);
          console.log("Abby cartChanel ===>", message);
          addToCart(message.data.id, message.data.customizationIds);
        }
      });
      cartChanel.subscribe("pop", (message) => {
        if (message.clientId !== clientId) {
          console.log(message.clientId, clientId);
          console.log("Abby cartChanel ===>", message);
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
