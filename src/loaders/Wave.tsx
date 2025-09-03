import { createLoader } from "../core/createLoader";
import { dur, ensureStyle } from "../utils";
import type { LoaderBaseProps } from "../types";

export const Wave = createLoader(
  ({ color, size, speed, className, style }: LoaderBaseProps) => {
    ensureStyle(
      "wave",
      `@keyframes rel-wave{0%{transform:scaleY(.4)}50%{transform:scaleY(1)}100%{transform:scaleY(.4)}}`
    );
    const h = size!;
    const bars = 7;
    const w = Math.max(2, Math.round(h / 12));
    const gap = Math.max(2, Math.round(h / 14));
    return (
      <div
        className={className}
        style={{ display: "inline-flex", gap, alignItems: "end", ...style }}
      >
        {Array.from({ length: bars }).map((_, i) => (
          <div
            key={i}
            style={{
              width: w,
              height: h,
              background: color,
              borderRadius: 2,
              transformOrigin: "50% 100%",
              animation: `rel-wave ${dur(1.2, speed)} ease-in-out ${
                i * 0.07
              }s infinite`,
            }}
          />
        ))}
      </div>
    );
  }
);
