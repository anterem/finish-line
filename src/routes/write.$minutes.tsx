import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";

export const Route = createFileRoute("/write/$minutes")({
  params: {
    parse: (rawParams) => {
      const minutes = Number(rawParams.minutes);
      if (!Number.isInteger(minutes) || isNaN(minutes) || minutes < 1) {
        return { minutes: 3 };
      }
      return { minutes };
    },
  },
  component: Write,
});

function Write() {
  const { minutes } = Route.useParams();
  const [timeLeft, setTimeLeft] = useState(minutes * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [minutes]);
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString()}:${secs.toString().padStart(2, "0")}`;
  };
  return (
    <>
      <Header>{formatTime(timeLeft)}</Header>
    </>
  );
}
