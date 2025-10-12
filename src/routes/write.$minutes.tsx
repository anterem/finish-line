import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/write/$minutes")({
  params: {
    parse: (rawParams) => {
      const minutes = Number(rawParams.minutes);
      return { minutes };
    },
  },
  component: Write,
});

function Write() {
  const { minutes } = Route.useParams();
  return <div>Write for {minutes} minutes</div>;
}
