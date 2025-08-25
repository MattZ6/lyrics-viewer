import { createRef, useLayoutEffect, useRef } from "react";
import { useAtomValue } from "jotai";

import { audioRefAtom, type Segment } from "@/atoms/player";
import { showTranslatedTextAtom } from "@/atoms/segment-view";
import { currentSegmentIndexAtom } from "@/atoms/segment";

import { useScrollToSegment } from "@/hooks/use-scroll-to-segment";
import { useKeyboardShortcut } from "@/hooks/use-keyboard-shortcut";

import { cn } from "@/lib/utils";

import { MarkerSegment } from "./components/marker";
import { LyricSegment } from "./components/lyric";
import { PositionDebugger } from "./components/position-debugger";

type Props = {
  segments: Segment[]
}

function findPreviousLyric(segments: Segment[], currentIndex: number) {
  for (let i = currentIndex - 1; i >= 0; i--) {
    const segment = segments[i]

    if (segment.type === "lyric") {
      return segment
    }
  }

  return null
}

function findNextLyric(segments: Segment[], currentIndex: number) {
  for (let i = currentIndex + 1; i < segments.length; i++) {
    const segment = segments[i]

    if (segment.type === "lyric") {
      return segment
    }
  }

  return null
}

export function Segments({ segments }: Props) {
  const topSpacerRef = useRef<HTMLLIElement>(null)
  const bottomSpacerRef = useRef<HTMLLIElement>(null)

  const audioRef = useAtomValue(audioRefAtom)
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

  useKeyboardShortcut(["ArrowUp"], (event) => {
    event.preventDefault()

    const segment = findPreviousLyric(segments, selectedSegmentIndex)

    if (!segment) {
      return
    }

    if (!audioRef) {
      return
    }

    audioRef.currentTime = segment.time
  });

  useKeyboardShortcut(["ArrowDown"], (event) => {
    event.preventDefault()

    const segment = findNextLyric(segments, selectedSegmentIndex)

    if (!segment) {
      return
    }

    if (!audioRef) {
      return
    }

    audioRef.currentTime = segment.time
  });

  return (
    <div className="relative flex flex-col h-full overflow-hidden">
      <ul
        tabIndex={-1}
        ref={scrollableContainerRef}
        className={cn(
          "flex-1 flex flex-col items-center relative py-8 overflow-y-auto overflow-x-hidden h-full pl-2",
        )}
        style={{
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 20%, black 90%, transparent)",
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskSize: "100% 100%",
          maskImage: "linear-gradient(to bottom, transparent, black 20%, black 90%, transparent)",
          maskRepeat: "no-repeat",
          maskSize: "100% 100%",
        }}
      >
        <li
          ref={topSpacerRef}
          className="w-full shrink-0"
        />

        {segments.map((segment, index) => (
          <li
            key={index}
            ref={segmentsRef.current[index]}
            className="flex items-center justify-center w-full"
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
