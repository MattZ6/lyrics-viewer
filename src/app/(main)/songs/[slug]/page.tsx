import { ArrowLeftIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { env } from "@/config/env";

import { getSongBySlug } from "@/utils/get-song-by-slug";

type Params = {
  slug: string;
};

type Props = {
  params: Promise<Params>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const song = getSongBySlug({ slug });

  if (!song) {
    return notFound();
  }

  const ogImageUrl = new URL(`/api/og/songs/${song.slug}`, env.appUrl);

  return {
    title: song.name,
    description: `${song.name} • ${song.band.name}`,
    metadataBase: new URL(env.appUrl),
    openGraph: {
      title: song.name,
      description: `${song.name} • ${song.band.name}`,
      type: "website",
      url: `/songs/${song.slug}`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: song.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: song.name,
      description: `${song.name} • ${song.band.name}`,
      images: [ogImageUrl],
    },
  };
}

export default async function SongPage({ params }: Props) {
  const { slug } = await params;

  const song = getSongBySlug({ slug });

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
