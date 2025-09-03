// Core
export {
  LoaderProvider,
  useLoader,
  useLoaderTheme,
} from "./core/LoaderProvider";
export { LoaderOverlay } from "./core/LoaderOverlay";
export { createLoader } from "./core/createLoader";
export { LoaderRegistry } from "./core/registry";
export * from "./types";

// Built-ins
export * from "./loaders";

// Generic Loader that resolves by registry name
import React from "react";
import type { LoaderBaseProps, LoaderComponent } from "./types";
import { LoaderRegistry } from "./core/registry";
import {
  Spinner,
  Ring,
  DualRing,
  Dots,
  Bars,
  Pulse,
  Bounce,
  Ripple,
  Roller,
  Grid,
  Wave,
  Progress,
} from "./loaders";

export type LoaderProps = LoaderBaseProps & {
  /** Built-in or registered loader name (case-insensitive) */
  type:
    | "spinner"
    | "ring"
    | "dualring"
    | "dots"
    | "bars"
    | "pulse"
    | "bounce"
    | "ripple"
    | "roller"
    | "grid"
    | "wave"
    | "progress"
    | (string & {}); // allow custom names
  [key: string]: any; // forward extra props to loader
};

export const Loader: React.FC<LoaderProps> = ({ type, ...rest }) => {
  const key = type.toLowerCase();

  // Check registry first
  const Registered = LoaderRegistry.get(key);
  if (Registered) return <Registered {...(rest as any)} />;

  // Built-in loaders map
  const builtinComponents: Record<string, LoaderComponent<any>> = {
    spinner: Spinner,
    ring: Ring,
    dualring: DualRing,
    dots: Dots,
    bars: Bars,
    pulse: Pulse,
    bounce: Bounce,
    ripple: Ripple,
    roller: Roller,
    grid: Grid,
    wave: Wave,
    progress: Progress,
  };

  const Component = builtinComponents[key] || builtinComponents.spinner;
  return <Component {...(rest as any)} />;
};
