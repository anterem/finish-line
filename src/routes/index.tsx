import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { css } from "styled-system/css";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [duration, setDuration] = useState(3);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.select();
    }
  }, []);

  const handleStart = () => {
    navigate({
      to: "/write/$minutes",
      params: { minutes: duration },
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleStart();
  };

  return (
    <div>
      <h1 className={css({ fontSize: "2rem" })}>Finish line</h1>
      <form onSubmit={handleSubmit}>
        <div
          className={css({
            display: "flex",
            alignItems: "baseline",
            fontSize: "2rem",
          })}
        >
          I want to write for
          <input
            ref={inputRef}
            type="number"
            value={duration === 0 ? "" : duration}
            inputMode="numeric"
            className={css({
              width: "10rem",
              textAlign: "center",
              p: 4,
              m: 2,
            })}
            autoFocus
            onChange={(e) => {
              const value = e.target.value;
              setDuration(value === "" ? 0 : Number(value));
            }}
          />
          minutes.
        </div>
      </form>
    </div>
  );
}
