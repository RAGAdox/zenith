const host = import.meta.env.VITE_HOST_API;
const protocol = import.meta.env.VITE_HOST_API_PROTOCOL || "https";

const urls = {
  menu: `${protocol}://${host}/menu`,
  callback: `${protocol}://${host}/callback`,
};
export default urls;
const sse = `${protocol}://${host}/sse`;

export { sse };

export type TypeOfUrls = keyof typeof urls;
