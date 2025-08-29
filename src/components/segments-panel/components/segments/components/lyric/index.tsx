import { useAtomValue } from "jotai";
import { memo, useCallback, useRef } from "react";

import {
  audioRefAtom,
  type LyricSegment as LyricSegmentType,
} from "@/atoms/player";

import { cn } from "@/lib/utils";

type Props = {
  segment: LyricSegmentType;
  isPast: boolean;
  isSelected: boolean;
  showTranslation: boolean;
};

export const LyricSegment = memo(
  function LyricSegment({
    segment,
    isPast,
    isSelected,
    showTranslation,
  }: Props) {
    const ref = useRef<HTMLButtonElement | null>(null);
    const audioRef = useAtomValue(audioRefAtom);

    const handleMoveToSegmentTime = useCallback(() => {
      if (audioRef) {
        audioRef.currentTime = segment.time;
      }
    }, [audioRef, segment.time]);

    const handleFocus = useCallback(() => {
      if (ref.current) {
        ref.current.blur();
      }
    }, []);

    return (
      <button
        ref={ref}
        type="button"
        tabIndex={-1}
        onClick={handleMoveToSegmentTime}
        onFocus={handleFocus}
        className={cn(
          "flex flex-col items-center text-centerpy-1 py-2 px-3 rounded-lg cursor-pointer transition-all",
          "active:scale-98 md:active:scale-100 duration-150 md:duration-200",
          "w-full md:w-fit",
          !isSelected && "hover:bg-zinc-900/50 focus-visible:bg-zinc-900/50",
          isPast && "scale-95 md:scale-90 active:scale-92 md:active:scale-90",
          isSelected &&
            "scale-110 active:scale-105 md:active:scale-110 bg-zinc-900",
        )}
      >
        <span
          className={cn(
            "font-medium text-lg transition-colors text-zinc-100 text-center select-none",
            "md:text-xl",
            isPast && "text-zinc-700",
            !isPast && !isSelected && "text-zinc-300",
          )}
        >
          {segment.text}
        </span>
        {showTranslation && !!segment.translatedText && (
          <span
            className={cn(
              "font-normal text-xs transition-colors text-zinc-400 text-center select-none",
              "md:text-sm",
              isPast && "text-zinc-700",
            )}
          >
            {segment.translatedText}
          </span>
        )}
      </button>
    );
  },
  (prev, next) => {
    return (
      prev.segment === next.segment &&
      prev.isSelected === next.isSelected &&
      prev.isPast === next.isPast &&
      prev.showTranslation === next.showTranslation
    );
  },
);
