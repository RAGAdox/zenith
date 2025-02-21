"use client";

import useUrlMessage from "@/hooks/useUrlMessage";
import { useState } from "react";
import { useFormStatus } from "react-dom";
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
    console.log("compairing===>", password, confirmPassword);
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

type SignUpFormErrorType = {
  email?: string[];
  password?: string[];
  confirmPassword?: string[];
};

interface SignUpFormProps {
  signUpAction: (formData: FormData) => void;
}

export default function SignUpForm({ signUpAction }: SignUpFormProps) {
  const { clearMessage, errorMessage, successMessage } = useUrlMessage();
  const { pending } = useFormStatus(); // Optional: Track form submission state

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<SignUpFormErrorType>({
    email: undefined,
    password: undefined,
    confirmPassword: undefined,
  });

  const handleError = (
    field: "email" | "password" | "confirmPassword",
    value: typeof formData
  ) => {
    const result = SignUpSchema.safeParse(value);
    if (!result.success) {
      const fieldError = result.error.errors.reduce((arr: string[], err) => {
        if (err.path[0] === field) {
          arr.push(err.message);
        }
        return arr;
      }, [] as string[]);
      setError((prev) => ({ ...prev, [field]: fieldError }));
    } else {
      setError((prev) => ({ ...prev, [field]: [] }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const field = e.target.name as "email" | "password" | "confirmPassword";
    setFormData({ ...formData, [field]: e.target.value });
    clearMessage();
    handleError(field, { ...formData, [field]: e.target.value });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const field = e.target.name as "email" | "password" | "confirmPassword";
    handleError(field, { ...formData, [field]: e.target.value });
  };

  const isFormValid = () => {
    const isInValid = Object.keys(error).some((key) => {
      const fieldError = error[key as keyof SignUpFormErrorType];
      if (!fieldError) {
        return true;
      }
      return fieldError.length > 0;
    });
    return isInValid;
  };

  return (
    <form
      action={signUpAction}
      className="flex-1 flex flex-col min-w-64 w-full"
    >
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
            className={`input w-full ${error.email && error.email.length > 0 ? "input-error" : ""}`}
            name="email"
            type="email"
            placeholder="you@example.com"
            required
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {error.email &&
            error.email.map((err, index) => (
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
            className={`input w-full ${error.password && error.password.length > 0 ? "input-error" : ""}`}
            type="password"
            name="password"
            placeholder="Your password"
            required
            value={formData.password}
            onChange={handleChange}
          />
          {error.password &&
            error.password.map((err, index) => (
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
            className={`input w-full ${error.confirmPassword && error.confirmPassword.length > 0 ? "input-error" : ""}`}
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {error.confirmPassword &&
            error.confirmPassword.map((err, index) => (
              <div key={index} className="px-3 text-error text-xs pt-1">
                {err}
              </div>
            ))}
        </div>

        {errorMessage && (
          <span className="px-3 text-xs text-error">{errorMessage}</span>
        )}
        <button
          type="submit"
          className="btn"
          disabled={pending || isFormValid()}
        >
          {pending ? "Signing up..." : "Sign up"}
        </button>
      </div>
    </form>
  );
}
