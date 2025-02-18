import React, { forwardRef, useImperativeHandle, useRef } from "react";

export type TextInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export interface TextInputRef {
  focus: () => void;
  blur: () => void;
  setValue: (value: string) => void;
  getValue: () => string;
}

const TextInput = forwardRef<TextInputRef, TextInputProps>((props, ref) => {
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

  return <input ref={inputRef} {...props} className="input" />;
});

export default TextInput;
