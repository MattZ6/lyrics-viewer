import { useCallback } from "react"
import { useAtomValue } from "jotai"

import { audioRefAtom, type LyricSegment } from "@/atoms/player"

import { cn } from "@/lib/utils"

type Props = {
  segment: LyricSegment
}

export function LyricSegment({ segment }: Props) {
  const audioRef = useAtomValue(audioRefAtom)

  const handleMoveToSegmentTime = useCallback(() => {
    if (audioRef) {
      audioRef.currentTime = segment.time
    }
  }, [audioRef, segment.time])

  return (
    <button
      type="button"
      className={cn(
        "text-center min-h-7 py-1 px-4 rounded-md cursor-pointer transition-all hover:bg-accent",
        // // selectedIndex && index < selectedIndex - 1 ? 'scale-95' : '',
        // // selectedIndex && index < selectedIndex - 2 ? 'scale-90' : '',
        // // selectedIndex && index < selectedIndex - 3 ? 'scale-85' : '',
        // selectedIndex && index < selectedIndex ? 'scale-90' : '',
        // index === selectedIndex ? 'scale-110' : ''
      )}
      onClick={handleMoveToSegmentTime}
    >

      <span
        className={cn(
          "font-normal text-xl transition-colors text-muted-foreground",
          // selectedIndex && index < selectedIndex ? 'text-muted-foreground/50' : '',
          // index === selectedIndex ? 'text-primary' : ''
        )}
      >
        {segment.text}
      </span>
    </button>
  )
}
