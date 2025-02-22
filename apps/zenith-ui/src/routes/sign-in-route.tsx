import { SignIn } from "@clerk/clerk-react";
import { SignInComponent } from "@zenith/components";
import { useLocation } from "react-router";

const SignInRoute = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const forceRedirectUrl = query.get("referer") || undefined;

  return (
    <SignInComponent classname="">
      <SignIn withSignUp forceRedirectUrl={forceRedirectUrl} />
    </SignInComponent>
  );
};

export default SignInRoute;
