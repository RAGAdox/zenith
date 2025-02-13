import { cn } from "@/lib";
import React from "react";
import Navbar from "./Navbar";

interface AppShellProps {
  classname?: string;
  bodyClassname?: string;
  enableSearch?: boolean;
  children: React.ReactNode;
  userSlot: React.ReactNode;
}

const AppShell = ({
  classname,
  children,
  bodyClassname,
  enableSearch,
  userSlot,
}: AppShellProps) => {
  return (
    <main
      className={cn(
        "h-screen w-full flex flex-col items-center justify-between bg-base-300",
        classname
      )}
    >
      <Navbar
        title="Zenith"
        titleLink="/"
        enableSearch={enableSearch}
        userSlot={userSlot}
      />
      <div className={cn("flex-grow", bodyClassname)}>{children}</div>
    </main>
  );
};
export type { AppShellProps };
export default AppShell;
