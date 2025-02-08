import { useEffect, useRef, useState } from "react";

interface UsePolling {
  pollingInterval?: number;
  dampPolling?: boolean;
  callback: (value?: any) => void;
}

const usePolling = ({
  pollingInterval = 10,
  dampPolling = false,
  callback,
}: UsePolling) => {
  const currentIntervalFunction = useRef<NodeJS.Timeout>(null);

  const [shouldDamp, setShouldDamp] = useState<boolean>(dampPolling);
  const [dampingFactor, setDampingFactor] = useState<number>(1);

  const pollFunction = (interval: number) => {
    if (currentIntervalFunction.current) {
      clearInterval(currentIntervalFunction.current);
    }
    currentIntervalFunction.current = setInterval(() => {
      console.log(
        "Interval Trigger ===>",
        interval * (Math.log(dampingFactor) + 1)
      );
      callback();
      if (shouldDamp) {
        setDampingFactor((factor) => factor + 1);
      }
    }, interval * (Math.log(dampingFactor) + 1));
  };

  useEffect(() => {
    console.log("Poll Triggered from UseEffect of Damping Factor");
    pollFunction(pollingInterval * 1000);
  }, [dampingFactor, shouldDamp]);

  const trigger = () => {
    pollFunction(pollingInterval * 1000);
  };

  const cancelPolling = () => {
    if (currentIntervalFunction.current) {
      clearInterval(currentIntervalFunction.current);
    }
  };

  return {
    startPolling: trigger,
    cancelPolling,
    startDamping: () => {
      console.log("Start Damping");
      setDampingFactor(1);
      setShouldDamp(true);
    },
    resetDamping: () => {
      console.log("Reset Damping");
      setDampingFactor(1);
      setShouldDamp(true);
    },
    stopDamping: () => {
      console.log("Stop Damping");
      callback();
      setDampingFactor(1);
      setShouldDamp(false);
    },
  };
};

export default usePolling;
