import { LyricSegmentItem } from "./lyric-segment";
import { MarkerSegmentItem } from "./marker-segment";

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
  segment: Segment;
};

export function SegmentItem({ segment }: Props) {
  if (segment.type === "marker") {
    return <MarkerSegmentItem segment={segment} />;
  }

  if (segment.type === "lyric") {
    return <LyricSegmentItem segment={segment} />;
  }

  return <li>Segment type not implemented</li>;
}
