import { useState } from "react";
import { ZodSchema } from "zod";

interface FormErrors<T> {
  [K: string]: string[] | undefined;
}
function useForm<T extends Record<string, any>>(
  schema: ZodSchema<T>,
  initValues: T
) {
  const initError = Object.fromEntries(
    Object.keys(initValues).map((key) => [key, undefined])
  );
  const [formData, setFormData] = useState<T>(initValues);
  const [formError, setFormErrors] = useState<FormErrors<T>>(initError);

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
    setFormData({ ...formData, [field]: e.target.value });
    validateField(field, { ...formData, [field]: e.target.value });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const field = e.target.name as keyof T;
    validateField(field, { ...formData, [field]: e.target.value });
  };

  const isFormValid = () => {
    return Object.values(formError).some(
      (err) => !err || (err && err.length > 0)
    );
  };

  return {
    formData,
    formError,
    handleChange,
    handleBlur,
    isFormValid,
  };
}

export default useForm;
