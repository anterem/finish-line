import { css } from "styled-system/css";

export function FlowEditor({ sprintComplete }: { sprintComplete: boolean }) {
  return (
    <textarea
      placeholder="Don't stop typing!"
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
