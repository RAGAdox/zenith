import { cn } from "@/lib";
import Navbar from "./Navbar";

interface AppShellProps {
  classname?: string;
  bodyClassname?: string;
  children: React.ReactNode;
}

const AppShell = ({ classname, children, bodyClassname }: AppShellProps) => {
  return (
    <main
      className={cn(
        classname,
        "h-screen w-full flex flex-col items-center justify-between bg-base-300"
      )}
    >
      <Navbar title="Zenith" titleLink="/" />
      <div className={cn("flex-grow", bodyClassname)}>{children}</div>
    </main>
  );
};

export default AppShell;
