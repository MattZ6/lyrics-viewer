import { useAtomValue } from "jotai";
import Image from "next/image";

import { currentTrackAtom } from "@/atoms/player";

export function CurrentTrack() {
  const track = useAtomValue(currentTrackAtom);

  if (!track) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <div className="size-12 rounded-md shrink-0 bg-black">
        <Image
          src={track.thumb}
          alt=""
          width={48}
          height={48}
          className="w-full h-full object-cover rounded-md select-none pointer-events-none"
        />
      </div>

      <div className="flex flex-col">
        <span className="font-medium text-zinc-200 selection:bg-zinc-50 selection:text-zinc-950">
          {track.title}
        </span>
        <span className="font-normal text-sm text-zinc-400 selection:bg-zinc-50 selection:text-zinc-950">
          {track.band}
        </span>
      </div>
    </div>
  );
}
