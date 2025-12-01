import { ArrowLeftIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SONGS } from "@/data/songs";

type Params = {
  slug: string;
};

type Props = {
  params: Promise<Params>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const song = SONGS.find(
    (song) => song.slug.toLowerCase() === slug.toLowerCase(),
  );

  if (!song) {
    return notFound();
  }

  return {
    title: song.name,
  };
}

export default async function SongPage({ params }: Props) {
  const { slug } = await params;

  const song = SONGS.find(
    (song) => song.slug.toLowerCase() === slug.toLowerCase(),
  );

  if (!song) {
    return notFound();
  }

  return (
    <main className="flex flex-col gap-10 max-w-5xl mx-auto p-4">
      <header className="flex flex-col items-start gap-3 min-h-20">
        <Link
          href="/songs"
          className="flex items-center gap-2 pl-3 pr-4 font-medium text-sm h-9 text-zinc-500 rounded-full hover:bg-zinc-900 -ml-3"
        >
          <ArrowLeftIcon className="size-5" />
          Back
        </Link>
        <h1 className="font-semibold text-4xl leading-none mt-auto">
          {song.name}
        </h1>
      </header>
    </main>
  );
}
