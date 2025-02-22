"use client";

import useForm from "@/hooks/useForm";
import useUrlMessage from "@/hooks/useUrlMessage";
import { useState } from "react";
import { z } from "zod";

const SignUpSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(6, "Password must be atleast 6 characters")
      .regex(/[A-Z]/, "Must include an uppercase letter")
      .regex(/[a-z]/, "Must include a lowercase letter")
      .regex(/\d/, "Must include a number")
      .regex(/[!@#$%^&*(),.?":{}|<>]/, "Must include at least one symbol"),
    confirmPassword: z.string().min(1, "Confirm Password is required"),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

interface SignUpFormProps {
  signUpAction: (formData: FormData) => Promise<void>;
}

export default function SignUpForm({ signUpAction }: SignUpFormProps) {
  const [isPending, setPending] = useState<boolean>(false);
  const serverMessage = useUrlMessage();

  const { formData, formError, isFormValid, handleChange, handleBlur } =
    useForm<z.infer<typeof SignUpSchema>>(SignUpSchema, {
      email: "",
      password: "",
      confirmPassword: "",
    });

  // Optional: Track form submission state

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    serverMessage?.clearMessage();
    handleChange(e);
  };

  const handleFormSubmit = async () => {
    setPending(true);
    const data = new FormData();
    data.append("email", formData.email);
    data.append("password", formData.password);
    signUpAction(data).then(() => setPending(false));
  };

  return (
    <form className="flex-1 flex flex-col min-w-64 w-full">
      <h1 className="mt-0 mb-0">Sign up</h1>
      <p>
        Already have an account? <a href="/sign-in">Sign in</a>
      </p>

      <div className="flex flex-col gap-4">
        <div>
          <label className="label px-3" htmlFor="email">
            Email
          </label>
          <input
            className={`input w-full ${formError.email && formError.email.length > 0 ? "input-error" : ""}`}
            name="email"
            type="email"
            placeholder="you@example.com"
            required
            value={formData.email}
            onChange={handleFormChange}
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
          <label className="label px-3" htmlFor="password">
            Password
          </label>
          <input
            className={`input w-full ${formError.password && formError.password.length > 0 ? "input-error" : ""}`}
            type="password"
            name="password"
            placeholder="Your password"
            required
            value={formData.password}
            onChange={handleFormChange}
          />
          {formError.password &&
            formError.password.map((err: string, index: number) => (
              <div key={index} className="px-3 text-error text-xs pt-1">
                {err}
              </div>
            ))}
        </div>

        <div>
          <label className="label px-3" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            className={`input w-full ${formError.confirmPassword && formError.confirmPassword.length > 0 ? "input-error" : ""}`}
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            required
            value={formData.confirmPassword}
            onChange={handleFormChange}
          />
          {formError.confirmPassword &&
            formError.confirmPassword.map((err: string, index: number) => (
              <div key={index} className="px-3 text-error text-xs pt-1">
                {err}
              </div>
            ))}
        </div>

        {serverMessage?.errorMessage && (
          <span className="px-3 text-error text-xs">
            {serverMessage.errorMessage}
          </span>
        )}
        <button
          type="submit"
          className="btn"
          onClick={handleFormSubmit}
          disabled={
            isPending ||
            isFormValid() ||
            typeof serverMessage.errorMessage === "string"
          }
        >
          {isPending ? "Signing up..." : "Sign up"}
        </button>
      </div>
    </form>
  );
}
