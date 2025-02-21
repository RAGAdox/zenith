import { signInAction } from "@/app/actions";
import Button from "@/components/Button";
import GoogleSSO from "@/components/GoogleSSO";

import Link from "next/link";

export default async function Login(props: { searchParams: Promise<any> }) {
  const searchParams = await props.searchParams;
  return (
    <div className="card max-w-sm w-full bg-base-100 m-4 p-4 prose">
      <form className="flex-1 flex flex-col min-w-64">
        <h1 className="mt-0 mb-0">Sign in</h1>
        <p>
          Don't have an account?{" "}
          <Link
            className="text-foreground font-medium underline"
            href="/sign-up"
          >
            Sign up
          </Link>
        </p>
        <div className="flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="label px-3">
              <span>Email</span>
            </label>
            <input
              className="input w-full"
              name="email"
              placeholder="you@example.com"
              required
              tabIndex={0}
            />
          </div>
          <div>
            <label
              className="label w-full justify-between px-3"
              htmlFor="password"
            >
              <span>Password</span>
              <Link
                className="block text-right text-xs"
                href="/forgot-password"
              >
                Forgot Password?
              </Link>
            </label>
            <input
              className="input w-full"
              type="password"
              name="password"
              placeholder="Your password"
              required
            />
          </div>
          <Button formAction={signInAction}>Sign in</Button>
        </div>
      </form>
      <div className=" divider" />
      <GoogleSSO />
    </div>
  );
}
