import type React from "react";

export type LoaderBaseProps = {
  /** primary color (stroke/fill) */
  color?: string;
  /** base size in px (diameter/height depending on loader) */
  size?: number;
  /** animation speed multiplier (1 = default, 2 = faster) */
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
  /** SSR fallback for environments without DOM */
  ssrFallback?: React.ReactNode;
};

export type LoaderTheme = {
  color?: string;
  size?: number;
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
};

export type LoaderComponent<P extends object = {}> = React.FC<
  LoaderBaseProps & P
>;

export type CustomAnimation =
  | "none"
  | "spin"
  | "pulse"
  | "bounce"
  | "fade"
  | { name: string; css: string; duration?: string };

export type OverlayProps = {
  open: boolean;
  loader?: React.ReactNode;
  message?: string;
  backdropColor?: string;
  zIndex?: number;
  /** attach to element; defaults to body */
  container?: Element | null;
  /** lock page scroll when open */
  lockScroll?: boolean;
};
