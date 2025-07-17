import { createRef, useLayoutEffect, useRef, type RefObject } from "react";
import { useAtomValue } from "jotai";

import type { Segment } from "@/atoms/player";
import { currentSegmentIndexAtom } from "@/atoms/segment";
import { scrollAnchorAtom } from "@/atoms/segment-view";

import { useScrollToSegment } from "@/hooks/use-scroll-to-segment";

import { cn } from "@/lib/utils";

import { MarkerSegment } from "./components/marker";
import { LyricSegment } from "./components/lyric";
// import { useSegmentsScrollPadding } from "@/hooks/use-segments-scroll-padding";

type Props = {
  segments: Segment[]
}

export function Segments({ segments }: Props) {
  const topSpacerRef = useRef<HTMLLIElement>(null)
  const bottomSpacerRef = useRef<HTMLLIElement>(null)

  const selectedSegmentIndex = useAtomValue(currentSegmentIndexAtom)

  const scrollableContainerRef = useRef<HTMLUListElement | null>(null);
  const segmentsRef = useRef(
    segments.map(() => createRef<HTMLLIElement>())
  );

  // const { topPadding, bottomPadding } = useSegmentsScrollPadding(36, 24);

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
          "flex-1 flex flex-col items-center relative py-8 overflow-auto h-full",
        )}
      >
        <li
          ref={topSpacerRef}
          // style={{ height: topPadding }}
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
                // TODO: Melhorar esse pedaço
                isPast={index + 1 < selectedSegmentIndex}
              />
            )}

            {segment.type === 'lyric' && (
              <LyricSegment
                segment={segment}
                isPast={index < selectedSegmentIndex}
                isSelected={index === selectedSegmentIndex}
              />
            )}
          </li>
        ))}

        <li
          ref={bottomSpacerRef}
          // style={{ height: bottomPadding }}
          className="w-full shrink-0"
        />
      </ul>

      <div className="absolute top-0 left-0 right-0 w-full h-10 shrink-0 bg-gradient-to-t from-background/25 to-background z-10" />
      <div className="absolute bottom-0 left-0 right-0 w-full h-10 shrink-0 bg-gradient-to-b from-background/25 to-background z-10" />

      {/* TODO: remover daqui pra só renderizar quando precisar */}
      <PositionDebugger scrollableContainerRef={scrollableContainerRef} />
    </div>
  )
}

type PositionDebuggerProps = {
  scrollableContainerRef: RefObject<HTMLUListElement | null>
}

function PositionDebugger({ scrollableContainerRef }: PositionDebuggerProps) {
  const debuggerRef = useRef<HTMLDivElement>(null)
  const scrollAnchor = useAtomValue(scrollAnchorAtom)

  useLayoutEffect(() => {
    if (debuggerRef.current && scrollableContainerRef.current) {
      const scrollableContentHeight = scrollableContainerRef.current?.clientHeight ?? 0;
      debuggerRef.current.style.top = `${scrollableContentHeight * scrollAnchor}px`;
    }
  }, [scrollAnchor, scrollableContainerRef])

  return (
    <div
      ref={debuggerRef}
      className="absolute left-0 right-0 w-full h-0 shrink-0 border-t border-cyan-600 text-cyan-600 border-dashed z-10 duration-250 transition-all"
    // style={{ top: `${topPosition}px` }}
    >
      Scroll anchor position ({scrollAnchor * 100}%)
    </div>
  )
}
