import { createLoader } from "../core/createLoader";
import { dur, ensureStyle } from "../utils";
import type { LoaderBaseProps } from "../types";

export const Bounce = createLoader(
  ({ color, size, speed, className, style }: LoaderBaseProps) => {
    ensureStyle(
      "bounce",
      `@keyframes rel-bounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-40%)}}`
    );
    const d = Math.max(6, Math.round(size! * 0.35));
    const gap = Math.max(2, Math.round(size! * 0.25));
    return (
      <div
        className={className}
        style={{ display: "inline-flex", gap, alignItems: "end", ...style }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: d,
              height: d,
              borderRadius: "50%",
              background: color,
              animation: `rel-bounce ${dur(0.9, speed)} ease-in-out ${
                i * 0.12
              }s infinite`,
            }}
          />
        ))}
      </div>
    );
  }
);
