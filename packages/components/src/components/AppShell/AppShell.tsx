import { cn } from "@/lib";
import React from "react";
import { Button } from "../Button";
import { Link } from "../Link";
import Navbar from "./Navbar";

interface AppShellProps {
  classname?: string;
  enableSearch?: boolean;
  children: React.ReactNode;
}

const AppShell = ({
  classname,
  children,
  enableSearch = false,
}: AppShellProps) => {
  const DrawerToggle = () => {
    return (
      <label
        htmlFor="my-drawer-3"
        aria-label="open sidebar"
        className="btn btn-square btn-ghost"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="inline-block h-6 w-6 stroke-current"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </label>
    );
  };
  return (
    <div className="min-h-svh max-w-screen flex flex-col overflow-y-auto drawer drawer-end">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <Navbar
        title="Zenith"
        titleLink="/"
        enableSearch={enableSearch}
        drawerToggle={<DrawerToggle />}
      />
      <main
        className={cn(
          "max-w-full flex-grow overflow-x-hidden overflow-y-auto flex flex-col bg-base-300 justify-center items-center drawer-content prose",
          classname
        )}
      >
        {children}
      </main>
      <div className="drawer-side flex mt-16">
        <ul className="menu h-full flex bg-base-200 min-w-full p-4">
          {/* Sidebar content here */}
          <Button variant="navlink" className="justify-start">
            <Link href="/profile">Profile</Link>
          </Button>
          <Button variant="navlink">
            <Link href="/signout">Sign Out</Link>
          </Button>
        </ul>
      </div>
    </div>
  );
};
export type { AppShellProps };
export default AppShell;
