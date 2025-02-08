import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/current-song/current-song.tsx"),
  route("/share-target", "routes/share-target/share-target.tsx"),
  route("/form", "routes/form-page/form-page.tsx"),
  route("/profile", "routes/profile/profile.tsx"),
] satisfies RouteConfig;
