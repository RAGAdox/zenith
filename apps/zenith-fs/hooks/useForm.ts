import { PasswordAction } from "@/types/action";
import { startTransition, useActionState, useState } from "react";
import { ZodSchema } from "zod";

interface FormErrors<T> {
  [K: string]: string[] | undefined;
}
function useForm<T extends Record<string, any>>(
  schema: ZodSchema<T>,
  action: (data: FormData) => Promise<PasswordAction>,
  initValues: T
) {
  const initError = Object.fromEntries(
    Object.keys(initValues).map((key) => [key, undefined])
  );
  const [formData, setFormData] = useState<T>(initValues);
  const [formError, setFormErrors] = useState<FormErrors<T>>(initError);
  const [state, formAction, pending] = useActionState(
    async (_: PasswordAction, payload: FormData | null) => {
      if (payload === null) {
        return null;
      }
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });
      if (!isFormInValid()) {
        return await action(data);
      }
      return { success: false, error: "Invalid Form" };
    },
    null
  );

  const validateField = (field: keyof T, value: T) => {
    const result = schema.safeParse(value);
    if (!result.success) {
      const fieldErrors = result.error.errors
        .filter((err) => err.path[0] === field)
        .map((err) => err.message);
      setFormErrors((prev) => ({ ...prev, [field]: fieldErrors }));
    } else {
      setFormErrors((prev) => ({ ...prev, [field]: [] }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const field = e.target.name as keyof T;
    if (state) {
      startTransition(() => {
        formAction(null); // Resets useActionState safely
      });
    }
    setFormData({ ...formData, [field]: e.target.value });
    validateField(field, { ...formData, [field]: e.target.value });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const field = e.target.name as keyof T;
    validateField(field, { ...formData, [field]: e.target.value });
  };

  const isFormInValid = () => {
    return Object.values(formError).some(
      (err) => !err || (err && err.length > 0)
    );
  };

  return {
    formData,
    formError,
    handleChange,
    handleBlur,
    isFormInValid,
    state,
    formAction,
    pending,
  };
}

export default useForm;
