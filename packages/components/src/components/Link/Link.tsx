import { cn } from "@/lib";
import React from "react";

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  asChild?: boolean;
}

const Link = ({
  asChild = false,
  href,
  children,
  className,
  ...props
}: LinkProps) => {
  console.log("link == >asChild===>", asChild);
  return (
    <a href={href} className={cn("btn", className)} {...props}>
      {children}
    </a>
  );
};

export default Link;
