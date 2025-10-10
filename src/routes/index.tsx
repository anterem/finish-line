import { createFileRoute } from "@tanstack/react-router";
import { css } from "styled-system/css";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div>
      <h1 className={css({ fontSize: "2rem" })}>Finish line</h1>
    </div>
  );
}
