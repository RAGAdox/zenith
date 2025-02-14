import { cn } from "@/lib";
import React from "react";
import Navbar from "./Navbar";

interface AppShellProps {
  classname?: string;
  enableSearch?: boolean;
  children: React.ReactNode;
  userSlot: React.ReactNode;
}

const AppShell = ({
  classname,
  children,
  enableSearch,
  userSlot,
}: AppShellProps) => {
  return (
    <div className="min-h-svh max-w-screen flex flex-col overflow-y-auto ">
      <Navbar
        title="Zenith"
        titleLink="/"
        enableSearch={enableSearch}
        userSlot={userSlot}
      />
      <main
        className={cn(
          "max-w-full flex-grow overflow-x-hidden overflow-y-auto flex flex-col bg-base-300 justify-center items-center prose",
          classname
        )}
      >
        {children}
      </main>
    </div>
  );
};
export type { AppShellProps };
export default AppShell;
