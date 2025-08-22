import { memo, useCallback } from "react"
import { useAtomValue } from "jotai"

import { audioRefAtom, type LyricSegment as LyricSegmentType } from "@/atoms/player"

import { cn } from "@/lib/utils"

type Props = {
  segment: LyricSegmentType
  isPast: boolean
  isSelected: boolean
  showTranslation: boolean
}

export const LyricSegment = memo(function LyricSegment({ segment, isPast, isSelected, showTranslation }: Props) {
  const audioRef = useAtomValue(audioRefAtom)

  const handleMoveToSegmentTime = useCallback(() => {
    if (audioRef) {
      audioRef.currentTime = segment.time
    }
  }, [audioRef, segment.time])

  return (
    <button
      type="button"
      tabIndex={-1}
      onClick={handleMoveToSegmentTime}
      className={cn(
        "flex flex-col items-center text-centerpy-1 py-2 px-3 rounded-lg cursor-pointer transition-all hover:bg-white/10 focus-visible:bg-white/10",
        "active:scale-98 md:active:scale-100 duration-150 md:duration-200",
        "w-full md:w-fit",
        isPast && 'scale-95 md:scale-90 active:scale-92 md:active:scale-90',
        isSelected && 'scale-110 active:scale-105 md:active:scale-110'
      )}
    >
      <span
        className={cn(
          "font-medium text-lg transition-colors text-white text-center",
          "md:text-xl",
          isPast && "text-white/16",
          !isPast && !isSelected && "text-white/84"
        )}
      >
        {segment.text}
      </span>
      {showTranslation && !!segment.translatedText && (
        <span
          className={cn(
            "font-normal text-xs transition-colors text-white/56 text-center",
            "md:text-sm",
            isPast && "text-white/16"
          )}
        >
          {segment.translatedText}
        </span>
      )}
    </button>
  )
}, (prev, next) => {
  return (
    prev.segment === next.segment &&
    prev.isSelected === next.isSelected &&
    prev.isPast === next.isPast &&
    prev.showTranslation === next.showTranslation
  )
})
