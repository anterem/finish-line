import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { css } from "styled-system/css";
import {
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
} from "./Dialog";

const BLOCKED_KEYS = new Set([
  "Backspace",
  "Delete",
  "ArrowLeft",
  "ArrowRight",
  "ArrowUp",
  "ArrowDown",
  "Home",
  "End",
  "PageUp",
  "PageDown",
]);

const DELAY_DURATION = 250;
const TIMEOUT_DURATION = 5000;
const MESSAGES = [
  "The void claims your unfinished thoughts.",
  "Silence descends.",
  "The story remains untold.",
  "Silence wins.",
  "The flow fades.",
  "The ink runs dry.",
];

export function FlowEditor({
  sprintComplete,
  startCountdown,
  stopCountdown,
  restart,
}: {
  sprintComplete: boolean;
  startCountdown: () => void;
  stopCountdown: () => void;
  restart: () => void;
}) {
  const navigate = useNavigate();
  const countdownStarted = useRef(false);
  const editorRef = useRef<HTMLTextAreaElement | null>(null);
  const delayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [failMessage, setFailMessage] = useState("");

  const resetCountdown = () => {
    if (delayTimerRef.current) clearTimeout(delayTimerRef.current);
    delayTimerRef.current = null;
    if (timeoutTimerRef.current) clearTimeout(timeoutTimerRef.current);
    timeoutTimerRef.current = null;
    setShowOverlay(false);
  };

  const handleSprintFail = () => {
    if (editorRef.current) editorRef.current.disabled = true;
    stopCountdown();
    const message = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
    setFailMessage(message);
    setShowModal(true);
  };

  const restartTimer = () => {
    resetCountdown();
    if (sprintComplete) return;
    delayTimerRef.current = setTimeout(() => {
      setShowOverlay(true);
      timeoutTimerRef.current = setTimeout(() => {
        handleSprintFail();
      }, TIMEOUT_DURATION);
    }, DELAY_DURATION);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!countdownStarted.current) {
      startCountdown();
      countdownStarted.current = true;
    }
    if (!sprintComplete && BLOCKED_KEYS.has(e.key)) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    restartTimer();
  };

  useEffect(() => {
    if (sprintComplete) resetCountdown();
  }, [sprintComplete]);

  useEffect(() => {
    return () => {
      resetCountdown();
    };
  }, []);

  return (
    <>
      <textarea
        ref={editorRef}
        placeholder="Don't stop typing…"
        onKeyDown={handleKeyDown}
        spellCheck={sprintComplete}
        className={css({
          flex: "1 1 auto",
          width: "100%",
          minH: "0",
          marginY: "2rem",
          boxSizing: "border-box",
          resize: "none",
          focusRing: "none",
        })}
        autoFocus
      />
      <DialogRoot open={showOverlay}>
        <DialogPortal forceMount>
          <DialogOverlay
            css={{
              opacity: 1,
              _open: {
                animation: "fadein",
                animationDuration: `${TIMEOUT_DURATION / 1000}s`,
                animationTimingFunction: "ease-in-out",
                animationFillMode: "forwards",
              },
              _closed: { display: "none" },
            }}
            style={{ pointerEvents: "none" }}
          />
          {showModal && (
            <DialogContent
              css={{
                padding: "0",
                color: "stone.400",
                backgroundColor: "none",
                fontSize: "1.6rem",
                boxShadow: "none",
                animation: "fadein",
                animationDuration: "2s",
              }}
            >
              <h1
                className={css({
                  fontSize: "5rem",
                  fontStyle: "italic",
                  lineHeight: 1,
                  marginBottom: "2rem",
                })}
              >
                {failMessage}
              </h1>
              <p>You stopped typing for too long.</p>
              <ul
                className={css({
                  marginY: "2rem",
                  listStyle: "none",
                  "& > li": {
                    color: "stone.500",
                    cursor: "pointer",
                    position: "relative",
                    transition: "color 0.4s ease",
                    _before: {
                      content: '""',
                      position: "absolute",
                      left: "-6",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "stone.400",
                      fontSize: "1rem",
                    },
                    "&:hover, &:focus-visible": {
                      color: "stone.300",
                      _before: {
                        content: '"➤"',
                      },
                    },
                  },
                })}
              >
                <li onClick={() => restart()}>Light the spark anew</li>
                <li onClick={() => navigate({ to: "/" })}>Return home</li>
              </ul>
            </DialogContent>
          )}
        </DialogPortal>
      </DialogRoot>
    </>
  );
}
