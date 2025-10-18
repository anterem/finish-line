import { css } from "styled-system/css";

export function Header({ children }: { children?: React.ReactNode }) {
  return (
    <header
      className={css({
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        py: 4,
        borderBottom: "2px solid black",
        borderRadius: "xs",
      })}
    >
      <h1
        className={css({
          fontSize: "2.4rem",
        })}
      >
        finish line
      </h1>
      {children}
    </header>
  );
}
