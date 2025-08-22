import { useEffect } from "react";

type KeyCombo = string | string[];

function normalizeKey(key: string) {
  return key.toLowerCase();
}

function parseCombo(combo: string) {
  const parts = combo.split("+");

  const modifiers = {
    ctrl: parts.some((p) => p.toLowerCase() === "ctrl"),
    shift: parts.some((p) => p.toLowerCase() === "shift"),
    alt: parts.some((p) => p.toLowerCase() === "alt"),
    meta: parts.some((p) => p.toLowerCase() === "meta"), // Cmd no Mac
  };

  const mainKey = parts
    .find(
      (p) =>
        !["ctrl", "shift", "alt", "meta"].includes(p.toLowerCase())
    )
    ?.toLowerCase();

  return { ...modifiers, key: mainKey };
}

function matchKeyCombo(event: KeyboardEvent, combo: string) {
  const { ctrl, shift, alt, meta, key } = parseCombo(combo);

  return (
    event.ctrlKey === ctrl &&
    event.shiftKey === shift &&
    event.altKey === alt &&
    event.metaKey === meta &&
    normalizeKey(event.key) === (key ?? normalizeKey(event.key))
  );
}

function isInputFocused(event: KeyboardEvent) {
  const target = event.target as HTMLElement
  const tag = target.tagName

  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    target.isContentEditable
  )
}

export function useKeyboardShortcut(
  keys: KeyCombo,
  callback: (event: KeyboardEvent) => void
) {
  useEffect(() => {
    function handleKeydown(event: KeyboardEvent) {
      if (isInputFocused(event)) {
        return
      }

      if (Array.isArray(keys)) {
        if (keys.some((keyCombo) => matchKeyCombo(event, keyCombo))) {
          callback(event);
        }
      } else {
        if (matchKeyCombo(event, keys)) {
          callback(event);
        }
      }
    }

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [keys, callback]);
}
