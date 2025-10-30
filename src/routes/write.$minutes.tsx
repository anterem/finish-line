import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
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
  const { secondsLeft, start } = useCountdown(minutes * 60, () =>
    setComplete(true),
  );

  useEffect(() => {
    start();
  }, []);

  return (
    <>
      <Header>{formatTime(secondsLeft)}</Header>
      <FlowEditor sprintComplete={complete} />
    </>
  );
}
