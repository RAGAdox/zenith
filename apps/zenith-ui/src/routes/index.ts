import { IRoute } from "@zenith/types";
import IndexRoute from "./index-route";
import ProfileRoute from "./profile-route";
import SignInRoute from "./sign-in-route";
import SignUpRoute from "./sign-up-route";
export { default as IndexRoute } from "./index-route";
export { default as ProfileRoute } from "./profile-route";
export { default as SignInRoute } from "./sign-in-route";
export { default as SignUpRoute } from "./sign-up-route";

const ROUTES: IRoute[] = [
  { path: "/", requireAuthentication: false, element: IndexRoute },
  {
    path: "/profile",
    requireAuthentication: true,
    requiredRole: ["admin"],
    element: ProfileRoute,
  },
  {
    path: "/sign-in",
    requireAuthentication: false,
    allowAuthenticated: false,
    element: SignInRoute,
  },
  {
    path: "/sign-up",
    requireAuthentication: false,
    allowAuthenticated: false,
    element: SignUpRoute,
  },
];

export default ROUTES;
