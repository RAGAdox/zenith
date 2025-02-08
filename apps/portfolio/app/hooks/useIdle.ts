import { useEffect, useRef, useState } from "react";

interface UseIdle {
  timeoutInSec?: number;
}
export default function useIdle({ timeoutInSec = 120 }: UseIdle = {}) {
  const [idle, setIdle] = useState<boolean>(false);

  const currentTimeout = useRef<NodeJS.Timeout>(null);

  const handleTimeout = () => {
    currentTimeout.current = setTimeout(() => {
      setIdle(true);
    }, timeoutInSec * 1000);
  };

  const handleEvent = () => {
    setIdle(false);

    /* Clear Existing Timeout and Triggers new Timeout */
    if (currentTimeout.current) {
      clearTimeout(currentTimeout.current);
    }

    handleTimeout();
  };

  const handleVisibilityChange = () => {
    if (!document.hidden) {
      handleEvent();
    } else {
      setIdle(true);
    }
  };

  useEffect(() => {
    handleTimeout();
    document.addEventListener("mousedown", handleEvent);
    document.addEventListener("mousemove", handleEvent);
    document.addEventListener("resize", handleEvent);
    document.addEventListener("keydown", handleEvent);
    document.addEventListener("touchstart", handleEvent);
    document.addEventListener("wheel", handleEvent);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      if (currentTimeout.current) {
        clearTimeout(currentTimeout.current);
      }

      document.addEventListener("mousedown", handleEvent);
      document.addEventListener("mousemove", handleEvent);
      document.addEventListener("resize", handleEvent);
      document.addEventListener("keydown", handleEvent);
      document.addEventListener("touchstart", handleEvent);
      document.addEventListener("wheel", handleEvent);
      document.addEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);
  return { idle };
}
