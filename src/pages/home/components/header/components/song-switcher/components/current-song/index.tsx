import { useAtomValue } from "jotai";
import { ChevronDown } from "lucide-react";

import { currentTrackAtom } from "@/atoms/player";

import { cn } from "@/lib/utils";

import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export function CurrentSong() {
  const currentSong = useAtomValue(currentTrackAtom)

  return (
    <DropdownMenuTrigger
      className={cn(
        "items-center gap-2 w-fit p-2 rounded-lg bg-white/10 border border-white/10 cursor-pointer hover:bg-white/15 focus-visible:bg-white/15",
        "hidden md:flex"
      )}
    >
      <img
        src={currentSong.thumb}
        alt=""
        className="size-10 rounded-md select-none"
      />

      <div className="flex flex-col text-left">
        <span className="font-medium text-sm text-white">
          {currentSong.title}
        </span>
        <span className="text-xs text-white/56">
          {currentSong.band}
        </span>
      </div>

      <ChevronDown className="size-5 text-white/32" />
    </DropdownMenuTrigger>
  )
}
