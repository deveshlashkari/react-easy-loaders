import { createLoader } from "../core/createLoader";
import type { LoaderBaseProps } from "../types";

export const Progress = createLoader<{ progress?: number }>(
  ({
    color,
    size,
    className,
    style,
    ...rest
  }: LoaderBaseProps & { progress?: number }) => {
    const h = Math.max(4, Math.round(size! / 10));
    return (
      <div
        className={className}
        style={{
          width: size! * 4,
          background: "rgba(0,0,0,0.08)",
          borderRadius: h,
          overflow: "hidden",
          ...style,
        }}
      >
        <div
          style={{
            width: `${rest.progress ?? 50}%`,
            height: h,
            background: color,
            transition: "width 0.3s ease",
          }}
        />
      </div>
    );
  }
);
