import { createLoader } from "../core/createLoader";
import { dur, ensureStyle } from "../utils";
import type { LoaderBaseProps } from "../types";

export const Roller = createLoader(
  ({ color, size, speed, className, style }: LoaderBaseProps) => {
    ensureStyle(
      "roller",
      `@keyframes rel-roller{to{transform:rotate(360deg)}}`
    );
    const s = size!;
    const dot = Math.max(4, Math.round(s / 8));
    const r = s / 2 - dot / 2;
    return (
      <div
        className={className}
        style={{ position: "relative", width: s, height: s, ...style }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            animation: `rel-roller ${dur(1, speed)} linear infinite`,
          }}
        >
          {[...Array(8)].map((_, i) => {
            const angle = (i * Math.PI * 2) / 8;
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: s / 2 + Math.cos(angle) * r - dot / 2,
                  top: s / 2 + Math.sin(angle) * r - dot / 2,
                  width: dot,
                  height: dot,
                  borderRadius: "50%",
                  background: color,
                }}
              />
            );
          })}
        </div>
      </div>
    );
  }
);
