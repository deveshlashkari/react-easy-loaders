import React from "react";
import type { LoaderBaseProps, LoaderComponent } from "../types";
import { useLoaderTheme } from "./LoaderProvider";

/**
 * Wraps a render function/component so it inherits theme defaults,
 * merges props, and stays consistent with the Loader API.
 */
export function createLoader<P extends object = {}>(
  render: (props: LoaderBaseProps & P) => React.ReactNode
): LoaderComponent<P> {
  const Comp: LoaderComponent<P> = (props: LoaderBaseProps & P) => {
    const theme = useLoaderTheme();
    const merged = {
      color: "#4b6bfb",
      size: 40,
      speed: 1,
      ...(theme || {}),
      ...(props as any),
    };
    const { ssrFallback } = merged as LoaderBaseProps;
    // If no DOM (SSR), render optional fallback if provided
    if (typeof window === "undefined" && ssrFallback) return <>{ssrFallback}</>;
    return <>{render(merged as any)}</>;
  };
  Comp.displayName = "CustomLoader";
  return Comp;
}
