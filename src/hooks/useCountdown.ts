import { useState, useEffect, useRef, useCallback } from "react";

export interface UseCountdownReturn {
  secondsLeft: number;
  isRunning: boolean;
  start: () => void;
  pause: () => void;
}

export function useCountdown(
  initialSeconds: number,
  onComplete?: () => void,
): UseCountdownReturn {
  const [seconds, setSeconds] = useState(Math.max(0, initialSeconds));
  const [isRunning, setIsRunning] = useState(false);

  const onCompleteRef = useRef(onComplete);
  const secondsRef = useRef(seconds);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    secondsRef.current = seconds;
  }, [seconds]);

  useEffect(() => {
    setSeconds(Math.max(0, initialSeconds));
    if (Math.max(0, initialSeconds) === 0) setIsRunning(false);
  }, [initialSeconds]);

  useEffect(() => {
    if (!isRunning) return;

    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds <= 0) return 0;
        const newSeconds = prevSeconds - 1;
        if (newSeconds === 0) {
          setIsRunning(false);
          onCompleteRef.current?.();
        }
        return newSeconds;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isRunning]);

  const start = useCallback(() => {
    if (secondsRef.current > 0) setIsRunning(true);
  }, []);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  return {
    secondsLeft: seconds,
    isRunning,
    start,
    pause,
  };
}
