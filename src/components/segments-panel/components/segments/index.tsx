"use client";

import { useAtomValue } from "jotai";
import { createRef, useRef } from "react";

import { audioRefAtom, type Segment } from "@/atoms/player";
import { currentSegmentIndexAtom } from "@/atoms/segment";
import { showTranslatedTextAtom } from "@/atoms/segment-view";

import { useKeyboardShortcut } from "@/hooks/use-keyboard-shortcut";
import { useScrollToSegment } from "@/hooks/use-scroll-to-segment";

import { cn } from "@/lib/utils";

import { LyricSegment } from "./components/lyric";
import { MarkerSegment } from "./components/marker";
import { PositionDebugger } from "./components/position-debugger";

function findPreviousLyric(segments: Segment[], currentIndex: number) {
  for (let i = currentIndex - 1; i >= 0; i--) {
    const segment = segments[i];

    if (segment.type === "lyric") {
      return segment;
    }
  }

  return null;
}

function findNextLyric(segments: Segment[], currentIndex: number) {
  for (let i = currentIndex + 1; i < segments.length; i++) {
    const segment = segments[i];

    if (segment.type === "lyric") {
      return segment;
    }
  }

  return null;
}

type Props = {
  segments: Segment[];
};

export function Segments({ segments }: Props) {
  const audioRef = useAtomValue(audioRefAtom);
  const showTranslatedSegmentText = useAtomValue(showTranslatedTextAtom);
  const selectedSegmentIndex = useAtomValue(currentSegmentIndexAtom);

  const scrollableContainerRef = useRef<HTMLUListElement | null>(null);
  const segmentsRef = useRef(segments.map(() => createRef<HTMLLIElement>()));

  useScrollToSegment(
    selectedSegmentIndex,
    scrollableContainerRef,
    segmentsRef.current,
  );

  useKeyboardShortcut(["ArrowUp"], (event) => {
    event.preventDefault();

    const segment = findPreviousLyric(segments, selectedSegmentIndex);

    if (!segment) {
      return;
    }

    if (!audioRef) {
      return;
    }

    audioRef.currentTime = segment.time;
  });

  useKeyboardShortcut(["ArrowDown"], (event) => {
    event.preventDefault();

    const segment = findNextLyric(segments, selectedSegmentIndex);

    if (!segment) {
      return;
    }

    if (!audioRef) {
      return;
    }

    audioRef.currentTime = segment.time;
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
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 20%, black 90%, transparent)",
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskSize: "100% 100%",
          maskImage:
            "linear-gradient(to bottom, transparent, black 20%, black 90%, transparent)",
          maskRepeat: "no-repeat",
          maskSize: "100% 100%",
        }}
      >
        <li className="w-full shrink-0 h-[70%]" />

        {segments.map((segment, index) => (
          <li
            key={String(index)}
            ref={segmentsRef.current[index]}
            className="flex items-center justify-center w-full"
          >
            {segment.type === "marker" && (
              <MarkerSegment
                segment={segment}
                withTopSpacing={
                  index > 0 && segments[index - 1].type === "lyric"
                }
                isPast={index + 1 < selectedSegmentIndex}
              />
            )}

            {segment.type === "lyric" && (
              <LyricSegment
                segment={segment}
                isPast={index < selectedSegmentIndex}
                isSelected={index === selectedSegmentIndex}
                showTranslation={showTranslatedSegmentText}
              />
            )}
          </li>
        ))}

        <li className="w-full shrink-0 h-[70%]" />
      </ul>

      <PositionDebugger scrollableContainerRef={scrollableContainerRef} />
    </div>
  );
}
