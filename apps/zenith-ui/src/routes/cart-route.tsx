import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAbly } from "../hooks";

const CartRoute = () => {
  const navigate = useNavigate();
  const { isAblyLoaded } = useAbly();
  const { isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    if (!(isLoaded && isSignedIn)) {
      navigate("/table");
      return;
    }
  }, [isAblyLoaded, isLoaded, isSignedIn]);

  return <div>CartRoute</div>;
};

export default CartRoute;
