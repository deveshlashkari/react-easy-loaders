import { createLoader } from "../core/createLoader";
import { dur, ensureStyle } from "../utils";
import type { LoaderBaseProps } from "../types";

export const Bars = createLoader(
  ({ color, size, speed, className, style }: LoaderBaseProps) => {
    ensureStyle(
      "bars",
      `@keyframes rel-bars{0%,40%,100%{transform:scaleY(0.4)}20%{transform:scaleY(1)}}`
    );
    const h = size!;
    const w = Math.max(2, Math.round(h / 8));
    const gap = Math.max(2, Math.round(h / 10));
    return (
      <div
        className={className}
        style={{ display: "inline-flex", gap, alignItems: "end", ...style }}
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              width: w,
              height: h,
              background: color,
              borderRadius: 2,
              transformOrigin: "50% 100%",
              animation: `rel-bars ${dur(0.9, speed)} ease-in-out ${
                i * 0.1
              }s infinite`,
            }}
          />
        ))}
      </div>
    );
  }
);
