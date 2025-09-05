"use client";

import { Settings } from "lucide-react";
import { Control } from "@/components/controls/components/control";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useWindowSize } from "@/hooks/use-window-size";
import { PositionDebuggerToggle } from "./components/position-debugger-toggle";
import { PositionSelector } from "./components/position-selector";
import { ScrollAnchorToggle } from "./components/scroll-anchor-toggle";

export function SettingsMenuControl() {
  const windowSize = useWindowSize();

  const isMobile = Number(windowSize.width ?? 0) <= 768;

  return (
    <Popover>
      <Tooltip>
        <TooltipContent side="left" sideOffset={12}>
          Settings
        </TooltipContent>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <Control
              aria-label="Settings menu"
              className="aria-expanded:bg-white/15 aria-expanded:text-white"
            >
              <Settings aria-hidden="true" className="size-5" />
            </Control>
          </PopoverTrigger>
        </TooltipTrigger>
      </Tooltip>

      <PopoverContent
        side="right"
        sideOffset={12}
        align={isMobile ? "end" : "center"}
        className="flex flex-col gap-4"
      >
        <span className="text-xs text-white/56 selection:bg-white selection:text-black">
          Settings
        </span>

        <PositionSelector />
        <ScrollAnchorToggle />

        <hr className="m-0 border-t border-zinc-700/56" />

        <PositionDebuggerToggle />
      </PopoverContent>
    </Popover>
  );
}
