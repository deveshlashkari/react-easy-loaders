import React, { useEffect } from "react";
import { OverlayProps } from "../types";
import { LoaderPortal } from "./LoaderPortal";
import { isBrowser } from "../utils";

export const LoaderOverlay: React.FC<OverlayProps> = ({
  open,
  loader,
  message,
  backdropColor = "rgba(0,0,0,0.45)",
  zIndex = 9999,
  container,
  lockScroll = true,
}) => {
  // lock body scroll when open
  useEffect(() => {
    if (!isBrowser || !lockScroll) return;
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open, lockScroll]);

  if (!open) return null;

  const content = (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: backdropColor,
        zIndex,
      }}
    >
      {loader ?? (
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: "9999px",
            border: "4px solid #fff",
            borderTopColor: "transparent",
            animation: "rel-spin 0.9s linear infinite",
          }}
        />
      )}
      {message && (
        <div style={{ marginTop: 12, color: "#fff", fontSize: 14 }}>
          {message}
        </div>
      )}

      {/* local keyframes to avoid global CSS requirements */}
      <style>{`@keyframes rel-spin {to { transform: rotate(360deg); }}`}</style>
    </div>
  );

  return <LoaderPortal container={container}>{content}</LoaderPortal>;
};
