import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAbly } from "../hooks";

const CartRoute = () => {
  
  const navigate = useNavigate();
  const { ably, isAblyLoaded } = useAbly();
  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    if (!(isLoaded && isSignedIn)) {
      navigate("/table");
      return;
    }
    if (isAblyLoaded) {
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
    }
  }, [isAblyLoaded, isLoaded, isSignedIn]);

  return <div>CartRoute</div>;
};

export default CartRoute;
