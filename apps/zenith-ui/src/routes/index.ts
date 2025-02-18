import { IRoute } from "@zenith/types";
import CartRoute from "./cart-route";
import IndexRoute from "./index-route";
import MenuRoute from "./menu-route";
import ProfileRoute from "./profile-route";
import ReserveTableRoute from "./reserve-table-route";
import SignInRoute from "./sign-in-route";

import SongRoute from "./song-route";
export { default as IndexRoute } from "./index-route";
export { default as ProfileRoute } from "./profile-route";
export { default as SignInRoute } from "./sign-in-route";

const ROUTES: IRoute[] = [
  { path: "/", requireAuthentication: false, element: IndexRoute },
  {
    path: "/song",
    requireAuthentication: true,
    element: SongRoute,
  },
  {
    path: "/profile",
    requireAuthentication: true,
    requiredRole: ["admin"],
    element: ProfileRoute,
  },
  {
    path: "/menu",
    requireAuthentication: false,
    element: MenuRoute,
  },
  {
    path: "/sign-in",
    requireAuthentication: false,
    allowAuthenticated: false,
    element: SignInRoute,
  },
  {
    path: "/cart",
    requireAuthentication: true,
    element: CartRoute,
  },
  {
    path: "/table",
    requireAuthentication: true,
    element: ReserveTableRoute,
  },
];

export default ROUTES;
