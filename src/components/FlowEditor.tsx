import { useRef, useState } from "react";
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

export function FlowEditor({ sprintComplete }: { sprintComplete: boolean }) {
  const delayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [isFading, setIsFading] = useState(false);

  const resetTimer = () => {
    if (delayTimerRef.current) clearTimeout(delayTimerRef.current);
    setIsFading(false);

    delayTimerRef.current = setTimeout(() => {
      setIsFading(true);
    }, DELAY_DURATION);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!sprintComplete && BLOCKED_KEYS.has(e.key)) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    resetTimer();
  };

  return (
    <textarea
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
        transitionDuration: "5s",
        transitionTimingFunction: "ease-in-out",
      })}
      autoFocus
    />
  );
}
