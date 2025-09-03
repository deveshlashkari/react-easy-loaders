import { createLoader } from "../core/createLoader";
import { dur, ensureStyle } from "../utils";
import type { LoaderBaseProps } from "../types";

export const Dots = createLoader(
  ({ color, size, speed, className, style }: LoaderBaseProps) => {
    ensureStyle(
      "dots",
      `@keyframes rel-dots{0%,80%,100%{transform:scale(0.6)}40%{transform:scale(1)}}`
    );
    const d = Math.max(6, Math.round(size! * 0.3));
    const gap = Math.max(2, Math.round(size! * 0.2));
    return (
      <div
        className={className}
        style={{ display: "inline-flex", gap, ...style }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: d,
              height: d,
              borderRadius: "50%",
              background: color,
              animation: `rel-dots ${dur(0.8, speed)} ease-in-out ${
                i * 0.12
              }s infinite`,
            }}
          />
        ))}
      </div>
    );
  }
);
