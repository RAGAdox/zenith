import ERROR_CODES from "./errorCodes";

export default function throwHttpErrors(errorCode: keyof typeof ERROR_CODES) {
  throw new Error(errorCode);
}
