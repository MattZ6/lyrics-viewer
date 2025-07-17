import { memo } from "react"

import type { MarkerSegment as MarkerSegmentType } from "@/atoms/player"

import { cn } from "@/lib/utils"

type Props = {
  segment: MarkerSegmentType
  isPast: boolean
}

export const MarkerSegment = memo(function MarkerSegment({ segment, isPast }: Props) {
  return (
    <div
      className={cn(
        "transition-all",
        isPast && "opacity-50 scale-90"
      )}
    >
      <span
        className="font-normal text-base text-muted-foreground transition-colors"
      >
        {segment.text}
      </span>
    </div>
  )
}, (prev, next) => {
  return (
    prev.segment === next.segment &&
    prev.isPast === next.isPast
  )
})
