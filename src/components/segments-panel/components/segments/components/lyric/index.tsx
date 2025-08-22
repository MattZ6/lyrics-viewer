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
        "flex flex-col text-centerpy-1 py-2 px-3 rounded-lg cursor-pointer transition-all hover:bg-white/10 focus-visible:bg-white/10",
        isPast && 'scale-95 md:scale-90',
        isSelected && 'scale-110'
      )}
    >
      <span
        className={cn(
          "font-medium text-lg transition-colors text-white",
          "md:text-xl",
          isPast && "text-white/32",
          !isPast && !isSelected && "text-white/84"
        )}
      >
        {segment.text}
      </span>
      {showTranslation && !!segment.translatedText && (
        <span
          className={cn(
            "font-normal text-xs transition-colors text-white/56",
            "md:text-sm",
            isPast && "text-white/32"
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
