export const isBrowser = typeof window !== "undefined" && !!window.document;

/**
 * Injects a <style> tag once per key.
 */
const injected = new Set<string>();
export function ensureStyle(key: string, css: string) {
  if (!isBrowser || injected.has(key)) return;
  injected.add(key);
  const style = document.createElement("style");
  style.setAttribute("data-rel", `rel-${key}`);
  style.textContent = css;
  document.head.appendChild(style);
}

/** normalize animation duration using speed multiplier */
export function dur(base: number, speed = 1) {
  const v = Math.max(0.0001, base / Math.max(0.0001, speed));
  return `${v}s`;
}
