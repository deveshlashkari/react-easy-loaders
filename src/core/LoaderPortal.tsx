import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { isBrowser } from "../utils";

type Props = {
  children: React.ReactNode;
  container?: Element | null;
};

export const LoaderPortal: React.FC<Props> = ({ children, container }) => {
  if (!isBrowser) return null;
  const target = container ?? document.body;

  // ensure container exists and is attached
  useEffect(() => {
    // no-op, but keeps parity for SSR hydration
  }, []);

  return createPortal(children, target);
};
