import { createLoader } from "../core/createLoader";
import { dur, ensureStyle } from "../utils";
import type { LoaderBaseProps } from "../types";

export const Pulse = createLoader(
  ({ color, size, speed, className, style }: LoaderBaseProps) => {
    ensureStyle(
      "pulse",
      `@keyframes rel-pulse{0%,100%{transform:scale(.85);opacity:.7}50%{transform:scale(1.15);opacity:1}}`
    );
    const s = size!;
    return (
      <div
        className={className}
        style={{
          width: s,
          height: s,
          borderRadius: "50%",
          background: color,
          animation: `rel-pulse ${dur(1.1, speed)} ease-in-out infinite`,
          ...style,
        }}
      />
    );
  }
);
