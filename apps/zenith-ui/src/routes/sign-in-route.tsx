import { SignIn } from "@clerk/clerk-react";
import { useLocation } from "react-router";

const SignInRoute = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const forceRedirectUrl = query.get("referer") || undefined;
  return <SignIn withSignUp forceRedirectUrl={forceRedirectUrl} />;
};

export default SignInRoute;
