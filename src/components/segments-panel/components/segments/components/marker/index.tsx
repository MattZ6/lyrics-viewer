import { memo } from "react"

import type { MarkerSegment as MarkerSegmentType } from "@/atoms/player"

import { cn } from "@/lib/utils"

type Props = {
  segment: MarkerSegmentType
  withTopSpacing: boolean
  isPast: boolean
}

export const MarkerSegment = memo(function MarkerSegment({ segment, withTopSpacing, isPast }: Props) {
  return (
    <div
      className={cn(
        "transition-all pb-4",
        withTopSpacing && "pt-8",
        isPast && "scale-90",
      )}
    >
      <span
        className={cn(
          "font-normal text-sm text-white/56 transition-colors",
          isPast && "text-white/32"
        )}
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
