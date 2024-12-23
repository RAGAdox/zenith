import React from "react";

interface RouteConfig {
  path: string;
  component: RouteComponent;
  exact?: boolean;
}

export interface QueryParams {
  [key: string]: string | string[] | undefined;
}

export interface RouteProps {
  query: QueryParams;
}

export interface RouteComponentProps {
  query: QueryParams;
}

export type RouteComponent = React.ComponentType<RouteComponentProps>;

export const routes: RouteConfig[] = [
  {
    path: "/",
    component: React.lazy(() => import("./pages/index/page")),
    exact: true,
  },
  {
    path: "/about",
    component: React.lazy(() => import("./pages/about/page")),
    exact: true,
  },
];

export const getComponent = (currentPath: string) => {
  const route: RouteConfig | undefined = routes.find((currentRoute) =>
    currentRoute.exact
      ? currentRoute.path === currentPath
      : currentPath.startsWith(currentRoute.path)
  );
  if (!route) {
    return React.lazy(() => import("./pages/not-found/page"));
  }
  return route.component;
};
