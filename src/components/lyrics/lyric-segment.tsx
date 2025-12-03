"use client";

type LyricSegment = {
  type: "lyric";
  text: string;
  time: number;
  translatedText?: string;
};

type Props = {
  segment: LyricSegment;
};

export function LyricSegmentItem({ segment }: Props) {
  return (
    <li className="flex flex-col">
      <button type="button" className="flex flex-col text-center">
        <span>{segment.text}</span>
        <span className="text-sm text-muted-foreground text-center">
          {segment.translatedText}
        </span>
      </button>
    </li>
  );
}
