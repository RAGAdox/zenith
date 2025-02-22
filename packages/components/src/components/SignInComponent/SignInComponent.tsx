import { cn } from "@/lib";
import "./SignInComponent.css";

interface SignInComponentProps {
  classname?: string;
  children: React.ReactNode;
}

const SignInComponent = ({ children, classname }: SignInComponentProps) => {
  return <div className={cn("sign-in-component", classname)}>{children}</div>;
};

export type { SignInComponentProps };
export default SignInComponent;
