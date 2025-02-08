const getCORSHeaders = (
  method: "GET" | "PUT" | "POST" | "DELETE" | "PATCH" = "GET",
  origin: string | string[] = "*"
) => ({
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": `${
    Array.isArray(origin) ? "[" + origin.join(",") + "]" : origin
  }`,
  "Access-Control-Allow-Methods": `${method}, OPTIONS`,
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Credentials": "true",
});

export default getCORSHeaders;
