import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { css } from "styled-system/css";
import { FlowEditor } from "@/components/FlowEditor";
import { Header } from "@/components/Header";
import { useCountdown } from "@/hooks/useCountdown";
import { formatTime } from "@/utils";

const MIN_MINUTES = 1;
const MAX_MINUTES = 30;

export const Route = createFileRoute("/write/$minutes")({
  params: {
    parse: (rawParams) => ({ minutes: Number(rawParams.minutes) }),
  },
  beforeLoad: ({ params }) => {
    const minutes = params.minutes;
    if (
      !Number.isInteger(minutes) ||
      minutes < MIN_MINUTES ||
      minutes > MAX_MINUTES
    ) {
      // add redirect later
      throw new Error(`invalid duration: ${params.minutes}`);
    }
  },
  component: Write,
});

function Write() {
  const { minutes } = Route.useParams();
  const [complete, setComplete] = useState(false);
  const [key, setKey] = useState(0);
  const { secondsLeft, start, pause, restart } = useCountdown(
    minutes * 60,
    () => setComplete(true),
  );

  const handleReset = () => {
    setKey((prevKey) => prevKey + 1);
    restart();
  };

  return (
    <div
      key={key}
      className={css({
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        minH: "100dvh",
      })}
    >
      <Header>{formatTime(secondsLeft)}</Header>
      <FlowEditor
        sprintComplete={complete}
        startCountdown={start}
        stopCountdown={pause}
        restart={handleReset}
      />
    </div>
  );
}
