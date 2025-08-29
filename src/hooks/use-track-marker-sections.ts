import { useAtomValue } from "jotai";
import { useMemo } from "react";

import { currentTrackAtom, durationAtom } from "@/atoms/player";

type MarkerSection = {
  label: string;
  startTime: number;
  endTime: number;
};

export function useTrackMarkerSections(): MarkerSection[] {
  const track = useAtomValue(currentTrackAtom);
  const duration = useAtomValue(durationAtom);

  return useMemo(() => {
    if (!track || !track.segments.length) return [];

    const sections: MarkerSection[] = [];
    const segments = track.segments;

    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];

      if (segment.type === "marker") {
        const nextLyric = segments.slice(i + 1).find((s) => s.type === "lyric");
        const startTime = nextLyric?.time ?? 0;

        const nextMarkerIndex = segments
          .slice(i + 1)
          .findIndex((s) => s.type === "marker");
        const nextMarker =
          nextMarkerIndex !== -1
            ? segments
                .slice(i + 1 + nextMarkerIndex)
                .find((s) => s.type === "lyric")
            : null;
        const endTime = nextMarker?.time ?? duration;

        sections.push({
          label: segment.text,
          startTime,
          endTime,
        });
      }
    }

    return sections;
  }, [track, duration]);
}
