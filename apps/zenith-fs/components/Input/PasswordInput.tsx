"use client";
import { forwardRef, useImperativeHandle, useRef } from "react";

interface PasswordInputRef {
  getValue: () => string;
}

type PasswordInputProps = React.InputHTMLAttributes<HTMLInputElement>;

const EmailInput = forwardRef<PasswordInputRef, PasswordInputProps>(
  ({ name, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
      focus: () => inputRef.current?.focus(),
      blur: () => inputRef.current?.blur(),
      setValue: (value: string) => {
        if (inputRef.current) {
          inputRef.current.value = value;
        }
      },
      getValue: () => inputRef.current?.value || "",
    }));
    return (
      <div>
        <label className="label px-3">Password</label>
        <input
          ref={inputRef}
          className="input validator w-full"
          type="password"
          name={name ?? "password"}
          {...props}
        />
      </div>
    );
  }
);

export default EmailInput;
