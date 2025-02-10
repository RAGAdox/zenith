export interface IRoute {
  path: string;
  requireAuthentication: boolean;
  allowAuthenticated?: false;
  requiredRole?: string[];
  element: React.ComponentType;
}
