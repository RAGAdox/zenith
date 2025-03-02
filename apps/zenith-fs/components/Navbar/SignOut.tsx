"use server";
import { signOutAction } from "@/actions/authActions";
import Button from "@/components/Button";

const SignOut = () => {
  return (
    <form action={signOutAction} className="w-full">
      <Button
        type="submit"
        variant="nav-link"
        className="justify-start btn-block"
      >
        Sign out
      </Button>
    </form>
  );
};

export default SignOut;
