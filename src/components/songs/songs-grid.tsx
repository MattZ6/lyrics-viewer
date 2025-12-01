import Link from "next/link";

import { SONGS } from "@/data/songs";

export function SongsGrid() {
  return (
    <ul className="grid grid-cols-4 gap-4">
      {SONGS.map((song) => (
        <li key={song.slug} className="bg-zinc-950 rounded-2xl">
          <Link
            className="flex flex-col h-60 rounded-2xl overflow-hidden"
            style={{
              backgroundImage: `url(${song.thumbnailUrl})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
            href={`/songs/${song.slug}`}
          >
            <div className="flex flex-1 flex-col rounded-2xl border-2 border-zinc-50/20 bg-zinc-950/35">
              <div className="mt-auto p-4 backdrop-blur-xs rounded-b-2xl">
                <div className="font-semibold text-base text-zinc-50">
                  {song.name}
                </div>
                <div className="text-sm opacity-60 text-zinc-50">
                  {song.band.name}
                </div>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
