import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { AppShell, Button, ZenithProvider } from "@zenith/components";
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

const UserSlot = () => {
  return (
    <>
      <SignedOut>
        <Button variant="ghost" asChild>
          <SignInButton mode="modal" />
        </Button>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </>
  );
};

const RootLayout = ({ children }: { children?: ReactNode }) => {
  return (
    <ZenithProvider linkComponent={RouterLink}>
      <AppShell enableSearch userSlot={<UserSlot />}>
        {children ? children : <Outlet />}
      </AppShell>
    </ZenithProvider>
  );
};

export default RootLayout;
