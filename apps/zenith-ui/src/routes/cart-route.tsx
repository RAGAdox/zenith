import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useAbly } from "../context";

const CartRoute = () => {
  const ably = useAbly();
  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    if (!ably || !(isLoaded && isSignedIn)) {
      return;
    }
    ably.auth.requestToken();
    const cartChanel = ably.channels.get(
      `cart:${user.publicMetadata.tableId}`,
      {
        params: { rewind: "1440m" },
      }
    );
    console.log("Cart subscribed");
    cartChanel.subscribe("push", (message) => {
      console.log("Abby cartChanel ===>", message);
    });

    return () => {
      console.log("cartChanel unsubscribed");
      cartChanel.unsubscribe();
    };
  }, [ably, isLoaded, isSignedIn]);

  return <div>CartRoute</div>;
};

export default CartRoute;
