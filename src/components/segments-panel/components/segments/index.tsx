import { createRef, useLayoutEffect, useRef } from "react";
import { useAtomValue } from "jotai";

import type { Segment } from "@/atoms/player";
import { currentSegmentIndexAtom } from "@/atoms/segment";

import { useScrollToSegment } from "@/hooks/use-scroll-to-segment";

import { cn } from "@/lib/utils";

import { MarkerSegment } from "./components/marker";
import { LyricSegment } from "./components/lyric";
import { PositionDebugger } from "./components/position-debugger";
import { showTranslatedTextAtom } from "@/atoms/segment-view";

type Props = {
  segments: Segment[]
}

export function Segments({ segments }: Props) {
  const topSpacerRef = useRef<HTMLLIElement>(null)
  const bottomSpacerRef = useRef<HTMLLIElement>(null)

  const showTranslatedSegmentText = useAtomValue(showTranslatedTextAtom)
  const selectedSegmentIndex = useAtomValue(currentSegmentIndexAtom)

  const scrollableContainerRef = useRef<HTMLUListElement | null>(null);
  const segmentsRef = useRef(
    segments.map(() => createRef<HTMLLIElement>())
  );

  useScrollToSegment(selectedSegmentIndex, scrollableContainerRef, segmentsRef.current);

  useLayoutEffect(() => {
    if (scrollableContainerRef.current && topSpacerRef.current && bottomSpacerRef.current) {
      const spacersHeight = scrollableContainerRef.current.clientHeight * 0.7;

      topSpacerRef.current.style.height = `${spacersHeight}px`;
      bottomSpacerRef.current.style.height = `${spacersHeight}px`;
    }
  }, [])

  return (
    <div className="relative flex flex-col h-full overflow-hidden">
      <ul
        ref={scrollableContainerRef}
        className={cn(
          "flex-1 flex flex-col items-center relative py-8 overflow-auto h-full pl-2",
        )}
      >
        <li
          ref={topSpacerRef}
          className="w-full shrink-0"
        />

        {segments.map((segment, index) => (
          <li
            key={index}
            ref={segmentsRef.current[index]}
            className="flex items-center"
          >
            {segment.type === 'marker' && (
              <MarkerSegment
                segment={segment}
                withTopSpacing={index > 0 && segments[index - 1].type === 'lyric'}
                isPast={index + 1 < selectedSegmentIndex}
              />
            )}

            {segment.type === 'lyric' && (
              <LyricSegment
                segment={segment}
                isPast={index < selectedSegmentIndex}
                isSelected={index === selectedSegmentIndex}
                showTranslation={showTranslatedSegmentText}
              />
            )}
          </li>
        ))}

        <li
          ref={bottomSpacerRef}
          className="w-full shrink-0"
        />
      </ul>

      {/* <div className="absolute top-0 left-0 right-0 w-full h-10 shrink-0 bg-gradient-to-t from-background/25 to-background z-10" /> */}
      {/* <div className="absolute bottom-0 left-0 right-0 w-full h-10 shrink-0 bg-gradient-to-b from-background/25 to-background z-10" /> */}

      <PositionDebugger scrollableContainerRef={scrollableContainerRef} />
    </div>
  )
}
