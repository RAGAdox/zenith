import { useAuth } from "@clerk/clerk-react";
import { useRef } from "react";
import store from "../store";
import { sse } from "../utils/api";

const useSSE = () => {
  const SSE_URL = sse;

  const { getToken } = useAuth();
  const abortControllerRef = useRef<AbortController>(null);
  const readerRef = useRef<ReadableStreamDefaultReader>(null);

  const handleSSE = async () => {
    abortControllerRef.current = new AbortController();
    await fetch(SSE_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
      keepalive: true,
      signal: abortControllerRef.current.signal,
    })
      .then((response: Response) => {
        const reader = response.body?.getReader();
        if (!reader) {
          return;
        }
        readerRef.current = reader;
        const decoder = new TextDecoder("utf-8");
        function read() {
          reader
            ?.read()
            .then(({ value, done }) => {
              if (done) return;

              const message = decoder.decode(value, { stream: true });
              const data = JSON.parse(message.slice(6));
              console.log(data);
              if (data.success) {
                store[data.resource as keyof typeof store]
                  .getState()
                  .setResourceValue(data.value);
              } else {
                store[data.resource as keyof typeof store]
                  .getState()
                  .setErrorCode(data.error);
              }
              read();
            })
            .catch((error) => {
              console.log("Reader Error==>", error);
            });
        }
        read();
      })
      .catch((error) => {
        console.log("In Catch Block");
        console.error(error);
      });
  };

  const closeSSE = async () => {
    if (readerRef.current) {
      await readerRef.current.cancel();
      readerRef.current = null;
    }
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  };

  return { triggerSSE: () => handleSSE(), closeSSE };
};

export default useSSE;
