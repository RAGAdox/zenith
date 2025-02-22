import { useEffect, useRef, useState } from "react";

interface UseTimeout {
  timeoutSec: number;
  callback: () => void;
}

const useTimeout = ({ timeoutSec, callback }: UseTimeout) => {
  const intervalRef = useRef<NodeJS.Timeout>(null);
  const [remainingTime, setRemainingTime] = useState(timeoutSec);
  const startTimeout = () => {
    intervalRef.current = setInterval(() => {
      setRemainingTime((time) => (time > 0 ? time - 1 : time));
    }, 1000);
    setTimeout(() => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      callback();
    }, timeoutSec * 1000);
  };
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return { remainingTime, startTimeout };
};

export default useTimeout;
