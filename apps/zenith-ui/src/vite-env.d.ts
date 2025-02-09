/// <reference types="vite/client" />

interface IRoute {
  path: string;
  requireAuthentication: boolean;
  allowAuthenticated?: false;
  requiredRole?: string[];
  element: JSX.Element;
}
