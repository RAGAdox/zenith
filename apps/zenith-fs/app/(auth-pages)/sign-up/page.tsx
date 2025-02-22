import { signUpAction } from "@/app/actions";
import { SignUpForm } from "@/components/FormComponents";
import GoogleSSO from "@/components/GoogleSSO";
import { Suspense } from "react";

export default async function Signup() {
  return (
    <div className="card max-w-sm w-full bg-base-100 m-4 p-4  prose">
      <Suspense>
        <SignUpForm signUpAction={signUpAction} />
      </Suspense>
      <div className=" divider" />
      <GoogleSSO />
    </div>
  );
}
