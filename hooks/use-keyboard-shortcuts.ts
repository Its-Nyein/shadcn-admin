import { useEffect } from "react";

interface KeyboardShortcutOptions {
  onFocusSearch?: () => void;
  onClearFilters?: () => void;
}

export function useKeyboardShortcuts({
  onFocusSearch,
  onClearFilters,
}: KeyboardShortcutOptions) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInputFocused =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

      // "/" to focus search (only when not already in an input)
      if (e.key === "/" && !isInputFocused && onFocusSearch) {
        e.preventDefault();
        onFocusSearch();
      }

      // "Esc" to clear filters and blur
      if (e.key === "Escape" && onClearFilters) {
        onClearFilters();
        if (isInputFocused) {
          (target as HTMLElement).blur();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onFocusSearch, onClearFilters]);
}
