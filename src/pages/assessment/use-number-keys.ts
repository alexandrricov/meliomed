import { useEffect } from "react";

/**
 * Maps digit keys 1-9 to callback functions.
 * Suppressed when an input/textarea/select is focused.
 */
export function useNumberKeys(callbacks: (() => void)[]) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      const idx = parseInt(e.key, 10) - 1;
      if (idx >= 0 && idx < callbacks.length) {
        e.preventDefault();
        callbacks[idx]!();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [callbacks]);
}
