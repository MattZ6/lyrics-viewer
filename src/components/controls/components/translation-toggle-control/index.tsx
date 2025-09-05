"use client";

import { useAtom } from "jotai";
import { Languages } from "lucide-react";
import { useCallback } from "react";

import { showTranslatedTextAtom } from "@/atoms/segment-view";

import { Control } from "@/components/controls/components/control";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useKeyboardShortcut } from "@/hooks/use-keyboard-shortcut";

const KEYBOARD_SHORTCUT = "T";

export function TranslationToggleControl() {
  const [showTranslation, toggleTranslationVisibility] = useAtom(
    showTranslatedTextAtom,
  );

  const handleToggle = useCallback(() => {
    toggleTranslationVisibility((value) => !value);
  }, [toggleTranslationVisibility]);

  useKeyboardShortcut(KEYBOARD_SHORTCUT, handleToggle);

  return (
    <Tooltip>
      <TooltipContent side="left" sideOffset={12}>
        Translation
        <span className="font-mono text-xs text-white/56 uppercase ml-1">
          {KEYBOARD_SHORTCUT}
        </span>
      </TooltipContent>
      <TooltipTrigger asChild>
        <Control
          onClick={handleToggle}
          aria-label="Translation toggle"
          className={
            showTranslation
              ? "bg-white/15 text-white hover:bg-white/15 focus-visible:bg-white/15 hover:text-white focus-visible:text-white"
              : ""
          }
        >
          <Languages aria-hidden="true" className="size-5" />
        </Control>
      </TooltipTrigger>
    </Tooltip>
  );
}
