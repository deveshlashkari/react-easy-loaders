import { createLoader } from "../core/createLoader";
import { dur, ensureStyle } from "../utils";
import type { LoaderBaseProps } from "../types";

export const Spinner = createLoader(
  ({ color, size, speed, className, style }: LoaderBaseProps) => {
    ensureStyle("spinner", `@keyframes rel-spin{to{transform:rotate(360deg)}}`);
    const s = size!;
    return (
      <div
        role="status"
        aria-label="Loading"
        className={className}
        style={{
          width: s,
          height: s,
          borderRadius: "50%",
          border: `${Math.max(2, Math.round(s / 12))}px solid ${color}`,
          borderTopColor: "transparent",
          animation: `rel-spin ${dur(0.9, speed)} linear infinite`,
          ...style,
        }}
      />
    );
  }
);
