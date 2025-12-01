import { ArrowLeftIcon, HeadphoneOffIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Song not found",
};

export default function SongNotFoundPage() {
  return (
    <main className="flex flex-col gap-10 max-w-5xl mx-auto p-4">
      <header className="flex flex-col items-start gap-3 min-h-21">
        <h1 className="font-semibold text-4xl leading-none mt-auto hidden opacity-0">
          Song not found
        </h1>
      </header>

      <section className="flex flex-col items-center gap-6">
        <div className="flex items-center justify-center size-48 rounded-full bg-zinc-900">
          <HeadphoneOffIcon className="size-14 text-zinc-400" />
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="font-semibold text-3xl leading-none text-center">
            Song not found
          </h2>
          <p className="text-base leading-relaxed text-center text-zinc-400">
            The song you are looking for does not exists or was removed.
          </p>
        </div>
        <Link
          href="/songs"
          className="flex items-center justify-center gap-2 pr-4 pl-3 text-base font-semibold h-10 rounded-full hover:bg-zinc-900 focus-visible:bg-zinc-900"
        >
          <ArrowLeftIcon className="size-6" />
          Go back
        </Link>
      </section>
    </main>
  );
}
