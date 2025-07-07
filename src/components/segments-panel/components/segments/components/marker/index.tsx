import type { MarkerSegment } from "@/atoms/player"

import { cn } from "@/lib/utils"

type Props = {
  segment: MarkerSegment
}

export function MarkerSegment({ segment }: Props) {
  return (
    <div
      className={cn(
        "transition-all",
        // index > 0 ? 'mt-8' : '',
      )}
    >

      <span className={cn(
        "font-normal text-base text-muted-foreground transition-colors",
        // selectedIndex && index < selectedIndex ? 'text-muted-foreground/50' : '',
      )}>
        {segment.text}
      </span>
    </div>
  )
}
