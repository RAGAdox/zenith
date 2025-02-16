import { useAuth } from "@clerk/clerk-react";
import Ably, { Realtime } from "ably";
import { createContext, useContext, useEffect, useState } from "react";
import urls from "../utils/api";

const AblyContext = createContext<Realtime | undefined>(undefined);

const AblyProvider = ({ children }: { children: React.ReactNode }) => {
  const [ably, setAbly] = useState<Realtime>();
  const { isLoaded, isSignedIn, getToken } = useAuth();

  const setAblyClient = async () => {
    const userToken = await getToken();
    const client = new Ably.Realtime({
      authUrl: urls.ably_token,
      authHeaders: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    console.log("Setting Abby");
    setAbly(client);
  };

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      setAblyClient();
    }
    return () => {
      ably?.close();
    };
  }, [isLoaded, isSignedIn]);

  return <AblyContext.Provider value={ably}>{children}</AblyContext.Provider>;
};

const useAbly = () => {
  const context = useContext(AblyContext);

  return context;
};

export { AblyProvider, useAbly };
