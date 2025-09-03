import { createLoader } from "../core/createLoader";
import { dur, ensureStyle } from "../utils";
import type { LoaderBaseProps } from "../types";

export const Grid = createLoader(
  ({ color, size, speed, className, style }: LoaderBaseProps) => {
    ensureStyle(
      "grid",
      `@keyframes rel-grid{0%,70%,100%{transform:scale(1)}35%{transform:scale(0.1)}}`
    );
    const s = size!;
    const n = 3;
    const gap = Math.max(2, Math.round(s / 10));
    const cell = (s - gap * (n - 1)) / n;
    return (
      <div
        className={className}
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${n}, ${cell}px)`,
          gap,
          ...style,
        }}
      >
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            style={{
              width: cell,
              height: cell,
              background: color,
              borderRadius: 2,
              animation: `rel-grid ${dur(1.2, speed)} ease-in-out ${
                ((i % 3) + Math.floor(i / 3)) * 0.06
              }s infinite`,
            }}
          />
        ))}
      </div>
    );
  }
);
