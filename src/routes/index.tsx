import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { css } from "styled-system/css";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [duration, setDuration] = useState(3);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.select();
    }
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Enter") return;
      if (
        formRef.current &&
        event.target instanceof Element &&
        !formRef.current.contains(event.target)
      ) {
        event.preventDefault();
        formRef.current.requestSubmit();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate({
      to: "/write/$minutes",
      params: { minutes: duration },
    });
  };

  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        minHeight: "100svh",
      })}
    >
      <div
        className={css({
          display: "flex",
          alignItems: "end",
          justifyContent: "center",
          minHeight: "50svh",
          color: "slate.700",
          rounded: "xs",
          borderBottom: "3px solid black",
          borderBottomRadius: "xs",
        })}
      >
        <h1
          className={css({
            mt: "8rem",
            fontSize: "8rem",
            fontWeight: "regular",
            textTransform: "lowercase",
          })}
        >
          Finish line
        </h1>
      </div>
      <div
        className={css({
          display: "grid",
          alignItems: "end",
          minHeight: "25svh",
          p: "1rem",
          textAlign: "center",
        })}
      >
        <form onSubmit={handleSubmit} ref={formRef}>
          <p className={css({ fontSize: "2.4rem" })}>
            I want to write for
            <input
              ref={inputRef}
              type="number"
              value={duration === 0 ? "" : duration}
              inputMode="numeric"
              className={css({
                width: "8rem",
                textAlign: "center",
                fontSize: "1.2em",
                fontWeight: "bold",
                px: 2,
                mx: 4,
                rounded: "md",
                bg: "stone.50",
                focusRing: "none",
                _focus: {
                  bg: "white",
                },
              })}
              autoFocus
              onChange={(e) => {
                const value = e.target.value;
                setDuration(value === "" ? 0 : Number(value));
              }}
            />
            minutes.
          </p>
          <p className={css({ p: 2 })}>Press enter to start.</p>
        </form>
      </div>
      <div className={css({ minHeight: "25svh" })}></div>
    </div>
  );
}
