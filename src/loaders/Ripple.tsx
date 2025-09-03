import { createLoader } from "../core/createLoader";
import { dur, ensureStyle } from "../utils";
import type { LoaderBaseProps } from "../types";

export const Ripple = createLoader(
  ({ color, size, speed, className, style }: LoaderBaseProps) => {
    ensureStyle(
      "ripple",
      `@keyframes rel-ripple{0%{transform:scale(.1);opacity:1}100%{transform:scale(1);opacity:0}}`
    );
    const s = size!;
    const b = Math.max(2, Math.round(s / 14));
    const base = {
      position: "absolute" as const,
      inset: 0,
      border: `${b}px solid ${color}`,
      borderRadius: "50%",
      animation: `rel-ripple ${dur(
        1.2,
        speed
      )} cubic-bezier(0,0.2,0.8,1) infinite`,
    };
    return (
      <div
        className={className}
        style={{ position: "relative", width: s, height: s, ...style }}
      >
        <div style={base} />
        <div style={{ ...base, animationDelay: dur(0.6, speed) }} />
      </div>
    );
  }
);
