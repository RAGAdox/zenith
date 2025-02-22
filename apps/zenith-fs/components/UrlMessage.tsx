"use client";

import { useSearchParams } from "next/navigation";



const UrlMessage = () => {
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get("error");
  const successMessage = searchParams.get("success");
  return (
    <>
      {errorMessage && (
        <span className="text-xs text-error">{errorMessage}</span>
      )}
      {successMessage && (
        <span className="text-xs text-success">{successMessage}</span>
      )}
    </>
  );
};

export default UrlMessage;
