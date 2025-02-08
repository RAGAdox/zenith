import { useEffect, useRef, useState } from "react";

interface UseTimedCallback {
  timeInSecs: number;
  callback?: (value?: any) => void;
}

const useTimedCallback = ({
  timeInSecs = 20,
  callback,
}: UseTimedCallback): [number, () => void, () => void] => {
  const [currentRemaining, setCurrentRemaining] = useState<number>(
    timeInSecs > 0 ? Math.floor(timeInSecs) : 0
  );
  let intervalFunction = useRef<string | number | NodeJS.Timeout | undefined>(
    undefined
  );
  let timeoutFunction = useRef<string | number | NodeJS.Timeout | undefined>(
    undefined
  );

  const cancelTimer = () => {
    if (intervalFunction.current && timeoutFunction.current) {
      clearInterval(intervalFunction.current);
      clearTimeout(timeoutFunction.current);
    }
  };

  const trigger = () => {
    intervalFunction.current = setInterval(() => {
      setCurrentRemaining((prev) => {
        if (prev === 0) {
          clearInterval(intervalFunction.current);
        }
        return prev > 0 ? prev - 1 : 0;
      });
    }, 1000);
    timeoutFunction.current = setTimeout(() => {
      clearInterval(intervalFunction.current);
      if (callback) {
        callback();
      }
    }, timeInSecs * 1000);
  };
  useEffect(() => {
    return () => {
      cancelTimer();
    };
  }, []);

  return [currentRemaining, trigger, cancelTimer];
};

export default useTimedCallback;
