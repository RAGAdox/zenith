import { ERROR_CODES } from ".";

export default function catchHttpErrors(error: any) {
  if (Object.keys(ERROR_CODES).includes(error.message)) {
    const errorCode = error.message as keyof typeof ERROR_CODES;

    return new Response(ERROR_CODES[errorCode].response, {
      status: ERROR_CODES[errorCode].status || 500,
    });
  }
  return new Response("UNKNOWN_ERROR", { status: 500 });
}
