import { LyricsViewer } from "./viewer";

type MarkerSegment = {
  type: "marker";
  text: string;
};

type LyricSegment = {
  type: "lyric";
  text: string;
  time: number;
  translatedText?: string;
};

type Segment = MarkerSegment | LyricSegment;

type Output = {
  default: Segment[];
};

const lyricsMap: Record<string, () => Promise<Output>> = {
  privilegio: async () => {
    const lyricsModule = await import("@/data/lyrics/privilegio/segments.json");
    return lyricsModule as Output;
  },
  "melhor-do-que-antes": async () => {
    const lyricsModule = await import(
      "@/data/lyrics/melhor-do-que-antes/segments.json"
    );
    return lyricsModule as Output;
  },
};

async function getLyrics(slug: string) {
  try {
    const loader = lyricsMap[slug];

    if (!loader) {
      return null;
    }

    const module = await loader();

    return module.default;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function LyricsPanel({ slug }: { slug: string }) {
  const segments = await getLyrics(slug);

  if (!segments) {
    return <p>This song doesn't have lyrics</p>;
  }

  return <LyricsViewer segments={segments} />;
}
