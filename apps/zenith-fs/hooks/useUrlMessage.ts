"use client";
import { useRouter, useSearchParams } from "next/navigation";

const useUrlMessage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  return {
    errorMessage: searchParams.get("error"),
    successMessage: searchParams.get("success"),
    clearMessage: () => {
      if (searchParams.get("success") || searchParams.get("error")) {
        router.push("?", { scroll: false });
      }
    },
  };
};

export default useUrlMessage;
