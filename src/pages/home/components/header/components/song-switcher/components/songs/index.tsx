import { useSetAtom } from "jotai";

import { currentTrackAtom } from "@/atoms/player";

import { tracks } from "@/data/tracks";

import { DropdownMenuGroup, DropdownMenuItem } from "@/components/ui/dropdown-menu";

export function Songs() {
  const selectSong = useSetAtom(currentTrackAtom)

  return (
    <DropdownMenuGroup>
      {tracks.map((song) => (
        <DropdownMenuItem
          key={song.id}
          className="focus:bg-white/10 focus:text-white cursor-pointer"
          onSelect={() => selectSong(song)}
        >
          <img src={song.thumb} alt="" className="size-8 rounded-xs" />
          <div className="flex flex-col">
            <span className="text-sm text-white">{song.title}</span>
          </div>
        </DropdownMenuItem>
      ))}
    </DropdownMenuGroup>
  )
}
