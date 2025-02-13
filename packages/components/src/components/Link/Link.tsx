import { cn } from "@/lib";
import React from "react";
import { useZenithContext } from "../ZenithContext/ZenithContext";

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

const Link = ({ href, children, className, ...props }: LinkProps) => {
  const Comp = useZenithContext() || "a";
  return (
    <Comp href={href} className={cn(className)} {...props}>
      {children}
    </Comp>
  );
};
export type { LinkProps };
export default Link;
