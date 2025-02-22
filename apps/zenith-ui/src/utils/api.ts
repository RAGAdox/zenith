const host = import.meta.env.VITE_HOST_API;
const protocol = import.meta.env.VITE_HOST_API_PROTOCOL || "https";

const urls = {
  menu: `${protocol}://${host}/menu`,
  cart: `${protocol}://${host}/cart`,
  callback: `${protocol}://${host}/callback`,
  ably_token: `${protocol}://${host}/ably_token`,
  table: `${protocol}://${host}/reserve_table`,
};
export default urls;
const sse = `${protocol}://${host}/sse`;

export { sse };

export type TypeOfUrls = keyof typeof urls;
