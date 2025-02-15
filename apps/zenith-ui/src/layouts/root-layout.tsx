import { AppShell, ZenithProvider } from "@zenith/components";
import { ReactNode } from "react";
import { Link, Outlet } from "react-router";

interface RouterLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  href: string;
}

const RouterLink = ({ children, href, ...props }: RouterLinkProps) => {
  return (
    <Link to={href} {...props}>
      {children}
    </Link>
  );
};

const RootLayout = ({ children }: { children?: ReactNode }) => {
  return (
    <ZenithProvider linkComponent={RouterLink}>
      <AppShell enableSearch>{children ? children : <Outlet />}</AppShell>
    </ZenithProvider>
  );
};

export default RootLayout;
