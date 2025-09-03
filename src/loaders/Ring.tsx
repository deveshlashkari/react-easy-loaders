import { createLoader } from "../core/createLoader";
import { dur } from "../utils";
import type { LoaderBaseProps } from "../types";

export const Ring = createLoader(
  ({ color, size, speed, className, style }: LoaderBaseProps) => {
    const s = size!;
    const stroke = Math.max(2, Math.round(s / 10));
    const r = (s - stroke) / 2;
    const c = 2 * Math.PI * r;
    return (
      <svg
        role="status"
        aria-label="Loading"
        width={s}
        height={s}
        viewBox={`0 0 ${s} ${s}`}
        className={className}
        style={{
          animation: `rotate ${dur(1.2, speed)} linear infinite`,
          ...style,
        }}
      >
        <defs>
          <style>{`
          @keyframes rotate { to { transform: rotate(360deg); } }
          @keyframes dash {
            0% { stroke-dasharray: 1, ${c}; stroke-dashoffset: 0; }
            50% { stroke-dasharray: ${c / 2}, ${c}; stroke-dashoffset: -${
            c / 4
          }; }
            100% { stroke-dasharray: 1, ${c}; stroke-dashoffset: -${c}; }
          }
        `}</style>
        </defs>
        <circle
          cx={s / 2}
          cy={s / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          style={{ animation: `dash ${dur(1.5, speed)} ease-in-out infinite` }}
        />
      </svg>
    );
  }
);
