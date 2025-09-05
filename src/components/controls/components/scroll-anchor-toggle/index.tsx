"use client";

import { useAtom } from "jotai";
import { Anchor } from "lucide-react";
import { useCallback } from "react";

import { autoScrollAtom } from "@/atoms/segment-view";

import { Control } from "@/components/controls/components/control";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useKeyboardShortcut } from "@/hooks/use-keyboard-shortcut";

const KEYBOARD_SHORTCUT = "A";

export function ScrollAnchorToggle() {
  const [scrollAnchoEnabled, setScrollAnchor] = useAtom(autoScrollAtom);

  const handleToggle = useCallback(() => {
    setScrollAnchor((value) => !value);
  }, [setScrollAnchor]);

  useKeyboardShortcut(KEYBOARD_SHORTCUT, handleToggle);

  return (
    <Tooltip>
      <TooltipContent side="left" sideOffset={12}>
        Scroll anchor
        <span className="font-mono text-xs text-white/56 uppercase ml-1">
          {KEYBOARD_SHORTCUT}
        </span>
      </TooltipContent>
      <TooltipTrigger asChild>
        <Control
          onClick={handleToggle}
          aria-label="Scroll anchor toggle"
          className={
            scrollAnchoEnabled
              ? "bg-white/15 text-white hover:bg-white/15 focus-visible:bg-white/15 hover:text-white focus-visible:text-white"
              : ""
          }
        >
          <Anchor aria-hidden="true" className="size-5" />
        </Control>
      </TooltipTrigger>
    </Tooltip>
  );
}
