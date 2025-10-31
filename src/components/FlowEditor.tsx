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

export function FlowEditor({ sprintComplete }: { sprintComplete: boolean }) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!sprintComplete && BLOCKED_KEYS.has(e.key)) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
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
      })}
      autoFocus
    />
  );
}
