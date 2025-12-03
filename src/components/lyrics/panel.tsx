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

const lyricsMap: Record<string, () => Promise<{ default: Segment[] }>> = {
  privilegio: () => import("@/data/lyrics/privilegio/segments.json"),
  "melhor-do-que-antes": () =>
    import("@/data/lyrics/melhor-do-que-antes/segments.json"),
};

async function getLyrics(slug: string) {
  try {
    const loader = lyricsMap[slug];
    if (!loader) return null;

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
