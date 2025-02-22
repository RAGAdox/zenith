"use client";
import Button from "@/components/Button";
import useForm from "@/hooks/useForm";
import useTimeout from "@/hooks/useTimeout";
import { PasswordAction } from "@/types/action";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { z } from "zod";

const SignInSchema = z.object({
  email: z.string().email().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

interface SignInFormProps {
  signInAction: (formData: FormData) => Promise<PasswordAction>;
}
const SignInForm = ({ signInAction }: SignInFormProps) => {
  const router = useRouter();
  const {
    formData,
    formError,
    handleBlur,
    handleChange,
    isFormInValid,
    formAction,
    pending,
    state,
  } = useForm(SignInSchema, signInAction, {
    email: "",
    password: "",
  });

  const { remainingTime, startTimeout } = useTimeout({
    timeoutSec: 5,
    callback: () => {
      router.push("/");
    },
  });

  useEffect(() => {
    if (state && state.success) {
      startTimeout();
    }
  }, [state]);

  return (
    <form className="flex-1 flex flex-col min-w-64" action={formAction}>
      <h1 className="mt-0 mb-0">Sign in</h1>
      <p>
        Don't have an account?{" "}
        <Link className="text-foreground font-medium underline" href="/sign-up">
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
            value={formData.email}
            required
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {formError.email &&
            formError.email.map((err: string, index: number) => (
              <div key={index} className="px-3 text-error text-xs pt-1">
                {err}
              </div>
            ))}
        </div>
        <div>
          <label
            className="label w-full justify-between px-3"
            htmlFor="password"
          >
            <span>Password</span>
            <Link className="block text-right text-xs" href="/forgot-password">
              Forgot Password?
            </Link>
          </label>
          <input
            className="input w-full"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            type="password"
            name="password"
            placeholder="Your password"
            required
          />
          {formError.password &&
            formError.password.map((err: string, index: number) => (
              <div key={index} className="px-3 text-error text-xs pt-1">
                {err}
              </div>
            ))}
        </div>
        {state && state.success && (
          <span className="px-3 text-success text-xs">
            Sign in successful
            <br />
            Redirecting in {remainingTime}
          </span>
        )}
        {state && !state.success && (
          <div className="px-3 text-error text-xs">{state.error}</div>
        )}
        <Button disabled={pending || isFormInValid() || state !== null}>
          Sign in
        </Button>
      </div>
    </form>
  );
};

export default SignInForm;
