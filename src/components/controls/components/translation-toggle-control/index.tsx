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

export function TranslationToggleControl() {
  const [showTranslation, toggleTranslationVisibility] = useAtom(
    showTranslatedTextAtom,
  );

  const handleToggle = useCallback(() => {
    toggleTranslationVisibility(!showTranslation);
  }, [showTranslation, toggleTranslationVisibility]);

  useKeyboardShortcut("T", handleToggle);

  return (
    <Tooltip>
      <TooltipContent side="left" sideOffset={12}>
        Translation
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
