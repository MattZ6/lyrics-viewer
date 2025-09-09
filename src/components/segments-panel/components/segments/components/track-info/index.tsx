import { useAtomValue } from "jotai";
import Image from "next/image";
import { currentTrackAtom } from "@/atoms/player";

export function TrackInfo() {
  const currentTrack = useAtomValue(currentTrackAtom);

  return (
    <div className="flex flex-col items-center justify-end gap-4 p-4 selection:bg-white selection:text-black">
      <div className="flex items-center gap-4">
        <Image
          className="size-12 select-none"
          src={{ src: currentTrack.thumb, width: 48, height: 48 }}
          alt=""
        />
        <div className="flex flex-col gap-1">
          <span className="text-xs text-white/56 selection:bg-white selection:text-black">
            {currentTrack.album}
          </span>
          <span className="text-white selection:bg-white selection:text-black">
            {currentTrack.title}
          </span>
        </div>
      </div>

      <hr className="w-12 h-[1px] my-4 border-0 bg-gradient-to-r from-zinc-900 to-zinc-800" />

      <div className="flex flex-col items-center">
        <span className="text-center text-sm text-white/82 mb-2">
          Performed by
        </span>
        <p className="text-center text-sm text-white/56">{currentTrack.band}</p>
      </div>

      <div className="flex flex-col items-center">
        <span className="text-center text-sm text-white/82 mb-2">
          Written by
        </span>
        {currentTrack.writtenBy.map((person) => (
          <p key={person.name} className="text-center text-sm text-white/56">
            {person.name}{" "}
            {!!person.me && <span className="text-white/32">(me)</span>}
          </p>
        ))}
      </div>

      <div className="flex flex-col items-center">
        <span className="text-center text-sm text-white/82 mb-2">
          Produced by
        </span>
        {currentTrack.producedBy.map((person) => (
          <p key={person.name} className="text-center text-sm text-white/56">
            {person.name}{" "}
            {!!person.me && <span className="text-white/32">(me)</span>}
          </p>
        ))}
      </div>

      <hr className="w-12 h-[1px] border-0 bg-gradient-to-r from-zinc-900 to-zinc-800" />

      <div className="flex flex-col items-center">
        <p className="text-center text-xs text-white/56">
          {currentTrack.releasedAt.toLocaleDateString("en-us", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        <p className="text-center text-xs text-white/56">
          © {currentTrack.releasedAt.getFullYear()} {currentTrack.band}
        </p>
        <p className="text-center text-xs text-white/56">
          ℗ {currentTrack.releasedAt.getFullYear()} {currentTrack.band}
        </p>
      </div>
    </div>
  );
}
