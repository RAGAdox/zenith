export const runtime = "edge"; // Edge function

import { signInAction } from "@/actions/authActions";
import { SignInFrom } from "@/components/FormComponents";
import GoogleSSO from "@/components/GoogleSSO";

export default async function Login() {
  return (
    <div className="card max-w-sm w-full bg-base-100 m-4 p-4 prose">
      <SignInFrom signInAction={signInAction} />
      <div className=" divider" />
      <GoogleSSO />
    </div>
  );
}
