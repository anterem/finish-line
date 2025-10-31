import { useEffect, useRef, useState } from "react";
import { css } from "styled-system/css";

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

export function FlowEditor({ sprintComplete }: { sprintComplete: boolean }) {
  const editorRef = useRef<HTMLTextAreaElement | null>(null);
  const delayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [isFading, setIsFading] = useState(false);

  const clearTimers = () => {
    if (delayTimerRef.current) clearTimeout(delayTimerRef.current);
    delayTimerRef.current = null;
    if (timeoutTimerRef.current) clearTimeout(timeoutTimerRef.current);
    timeoutTimerRef.current = null;
    setIsFading(false);
  };

  const restartTimer = () => {
    clearTimers();
    if (sprintComplete) return;

    delayTimerRef.current = setTimeout(() => {
      setIsFading(true);
      timeoutTimerRef.current = setTimeout(() => {
        if (editorRef.current) editorRef.current.value = "";
        setIsFading(false);
      }, TIMEOUT_DURATION);
    }, DELAY_DURATION);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!sprintComplete && BLOCKED_KEYS.has(e.key)) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    restartTimer();
  };

  useEffect(() => {
    if (sprintComplete) clearTimers();
  }, [sprintComplete]);

  useEffect(() => {
    return () => {
      clearTimers();
    };
  }, []);

  return (
    <textarea
      ref={editorRef}
      placeholder="Don't stop typing!"
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
        opacity: isFading ? 0 : 1,
        transitionProperty: isFading ? "opacity" : "none",
        transitionDuration: `${TIMEOUT_DURATION / 1000}s`,
        transitionTimingFunction: "ease-in-out",
      })}
      autoFocus
    />
  );
}
