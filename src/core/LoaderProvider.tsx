import React, { createContext, useContext, useMemo, useState } from "react";
import { LoaderOverlay } from "./LoaderOverlay";
import type { LoaderTheme } from "../types";

type Ctx = {
  theme: LoaderTheme;
  setTheme: (next: LoaderTheme | ((t: LoaderTheme) => LoaderTheme)) => void;
  showLoader: (node?: React.ReactNode, message?: string) => void;
  hideLoader: () => void;
};

const LoaderContext = createContext<Ctx | null>(null);

export const LoaderProvider: React.FC<{
  children: React.ReactNode;
  value?: LoaderTheme;
}> = ({ children, value }) => {
  const [theme, setTheme] = useState<LoaderTheme>(value ?? {});
  const [open, setOpen] = useState(false);
  const [node, setNode] = useState<React.ReactNode>(null);
  const [msg, setMsg] = useState<string>("");

  const showLoader = (n?: React.ReactNode, message?: string) => {
    setNode(n ?? null);
    setMsg(message ?? "");
    setOpen(true);
  };
  const hideLoader = () => setOpen(false);

  const ctx = useMemo<Ctx>(
    () => ({ theme, setTheme, showLoader, hideLoader }),
    [theme]
  );

  return (
    <LoaderContext.Provider value={ctx}>
      {children}
      <LoaderOverlay open={open} loader={node ?? undefined} message={msg} />
    </LoaderContext.Provider>
  );
};

export function useLoader() {
  const c = useContext(LoaderContext);
  if (!c) throw new Error("useLoader must be used within <LoaderProvider>");
  return {
    showLoader: c.showLoader,
    hideLoader: c.hideLoader,
    setTheme: c.setTheme,
  };
}

export function useLoaderTheme() {
  const c = useContext(LoaderContext);
  if (!c)
    throw new Error("useLoaderTheme must be used within <LoaderProvider>");
  return c.theme;
}
