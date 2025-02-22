import { cn } from "@/lib";
import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";

const buttonVariants = cva("btn", {
  variants: {
    variant: {
      default: "",
      cta: "btn-primary",
      secondary: "btn-secondary",
      ghost: "btn-ghost",
      navlink: "btn-ghost",
    },
  },
});

interface ButtonProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, asChild, children, variant, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        {...props}
        ref={ref}
        className={cn(buttonVariants({ variant }), className)}
      >
        {children}
      </Comp>
    );
  }
);

export type { ButtonProps };
export default Button;
