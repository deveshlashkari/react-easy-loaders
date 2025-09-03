import { createLoader } from "../core/createLoader";
import { dur, ensureStyle } from "../utils";
import type { LoaderBaseProps } from "../types";

export const DualRing = createLoader(
  ({ color, size, speed, className, style }: LoaderBaseProps) => {
    ensureStyle(
      "dualring",
      `
    @keyframes rel-dualring { to { transform: rotate(360deg); } }
  `
    );
    const s = size!;
    const b = Math.max(2, Math.round(s / 12));
    return (
      <div
        className={className}
        style={{
          width: s,
          height: s,
          display: "inline-block",
          position: "relative",
          ...style,
        }}
      >
        <div
          style={{
            boxSizing: "border-box",
            display: "block",
            width: "100%",
            height: "100%",
            border: `${b}px solid ${color}`,
            borderColor: `${color} transparent ${color} transparent`,
            borderRadius: "50%",
            animation: `rel-dualring ${dur(1.2, speed)} linear infinite`,
          }}
        />
      </div>
    );
  }
);
