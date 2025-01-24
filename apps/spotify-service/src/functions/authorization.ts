import { getAuthorizationTokenURI } from "../service/getAuthorizationToken";

export default async () => {
  const redirect_uri = await getAuthorizationTokenURI();
  return new Response(null, {
    status: 307,
    headers: { Location: redirect_uri },
  });
};
