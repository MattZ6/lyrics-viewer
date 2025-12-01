import type { Metadata } from "next";

import { SongsGrid } from "@/components/songs/songs-grid";

export const metadata: Metadata = {
  title: "Songs",
};

export default function SongsPage() {
  return (
    <main className="flex flex-col gap-10 max-w-5xl mx-auto p-4">
      <header className="flex flex-col items-start gap-3 min-h-21">
        <h1 className="font-semibold text-4xl leading-none mt-auto text-white">
          Songs
        </h1>
      </header>

      <SongsGrid />
    </main>
  );
}
