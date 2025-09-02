"use client";

import { useAtom } from "jotai";
import { Languages } from "lucide-react";
import { useCallback } from "react";
import { showTranslatedTextAtom } from "@/atoms/segment-view";
import { Control } from "@/components/controls/components/control";
import { useKeyboardShortcut } from "@/hooks/use-keyboard-shortcut";

export function TranslationToggleControl() {
  const [showTranslation, toggleTranslationVisibility] = useAtom(
    showTranslatedTextAtom,
  );

  const handleToggle = useCallback(() => {
    toggleTranslationVisibility(!showTranslation);
  }, [showTranslation, toggleTranslationVisibility]);

  useKeyboardShortcut("T", handleToggle);

  return (
    <Control
      tooltip="Translation"
      onClick={handleToggle}
      className={showTranslation ? "bg-white text-black hover:bg-zinc-200 focus-visible:bg-zinc-200 hover:text-zinc-900 focus-visible:text-zinc-900" : ""}
    >
      <Languages aria-hidden="true" className="size-5" />
    </Control>
  );
}
