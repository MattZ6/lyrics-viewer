import { useAtomValue } from "jotai"

import { currentTrackAtom } from "@/atoms/player"

export function CurrentTrack() {
  const track = useAtomValue(currentTrackAtom)

  if (!track) {
    return null
  }

  return (
    <div className="flex items-center gap-2">
      <div className="size-12 rounded-md bg-white/10 shrink-0">
        <img src={track.thumb} alt="" className="w-full h-full object-cover rounded-md" />
      </div>

      <div className="flex flex-col">
        <div className="font-medium text-white">{track.title}</div>
        <div className="font-normal text-sm text-white/56">{track.band}</div>
      </div>
    </div>
  )
}
