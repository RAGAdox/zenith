import { useAuth } from "@clerk/clerk-react";
import Ably, { Realtime } from "ably";
import { useEffect, useState } from "react";
import urls from "../utils/api";

type UseAbly =
  | {
      isAblyLoaded: true;
      ably: Realtime;
      setAblyClient: () => Promise<void>;
      clientId: string;
    }
  | {
      isAblyLoaded: false;
      ably: undefined;
      setAblyClient: () => Promise<void>;
      clientId: undefined;
    };
export default function useAbly(): UseAbly {
  const { getToken, isLoaded, isSignedIn, userId } = useAuth();
  const [ably, setAbly] = useState<Realtime>();
  const [isAblyLoaded, setIsAblyLoaded] = useState(false);

  const setAblyClient = async () => {
    const client = new Ably.Realtime({
      authUrl: urls.ably_token,
      authHeaders: {
        Authorization: `Bearer ${await getToken()}`,
      },
      clientId: userId!,
      echoMessages: false,
    });
    setAbly(client);
    setIsAblyLoaded(true);
  };

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      setAblyClient();
    }
  }, [isLoaded, isSignedIn]);

  if (isAblyLoaded) {
    return {
      ably: ably!,
      setAblyClient,
      isAblyLoaded: true,
      clientId: userId!,
    };
  }
  return {
    isAblyLoaded: false,
    setAblyClient,
    ably: undefined,
    clientId: undefined,
  };
}
