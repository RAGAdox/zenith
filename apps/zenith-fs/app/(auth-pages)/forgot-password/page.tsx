export const runtime = "edge"; // Edge function

import { forgotPasswordAction } from "@/app/actions";

import Button from "@/components/Button";
import Link from "next/link";

export default async function ForgotPassword(props: {
  searchParams: Promise<any>;
}) {
  const searchParams = await props.searchParams;
  return (
    <div className="card max-w-sm w-full bg-base-100 m-4 p-4 prose">
      <form className="flex-1 flex flex-col min-w-64">
        <h1 className="mt-0 mb-0">Reset Password</h1>
        <p>
          Already have an account? <Link href="/sign-in">Sign in</Link>
        </p>

        <div className="flex flex-col gap-4">
          <div>
            <label htmlFor="email" className=" label px-3">
              Email
            </label>
            <input
              name="email"
              placeholder="you@example.com"
              className=" input w-full"
              required
            />
          </div>
          <Button formAction={forgotPasswordAction}>Reset Password</Button>
        </div>
      </form>
    </div>
  );
}
