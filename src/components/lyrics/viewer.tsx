"use client";

import { SegmentItem } from "./segment";

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

type Props = {
  segments: Segment[];
};

export function LyricsViewer({ segments }: Props) {
  return (
    <ul className="flex flex-col gap-4">
      {segments.map((segment, index) => (
        <SegmentItem key={String(index)} segment={segment} />
      ))}
    </ul>
  );
}
