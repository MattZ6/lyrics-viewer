import { memo } from "react";

import type { MarkerSegment as MarkerSegmentType } from "@/atoms/player";

import { cn } from "@/lib/utils";

type Props = {
  segment: MarkerSegmentType;
  withTopSpacing: boolean;
  isPast: boolean;
};

export const MarkerSegment = memo(
  function MarkerSegment({ segment, withTopSpacing, isPast }: Props) {
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
            "font-normal text-sm text-zinc-500 transition-colors select-none",
            isPast && "text-zinc-700",
          )}
        >
          {segment.text}
        </span>
      </div>
    );
  },
  (prev, next) => {
    return prev.segment === next.segment && prev.isPast === next.isPast;
  },
);
