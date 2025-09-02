"use client";

import { useAtom } from "jotai";

import { scrollAnchorAtom } from "@/atoms/segment-view";
import { cn } from "@/lib/utils";

const OPTIONS = [0.3, 0.5, 0.75];

export function PositionSelector() {
  const [anchor, setAnchor] = useAtom(scrollAnchorAtom);

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm text-white font-medium selection:bg-white selection:text-black">
        Scroll anchor position
      </span>
      <div className="flex items-center self-start p-1 rounded-full bg-zinc-700/50">
        {OPTIONS.map((value) => (
          <button
            key={value}
            type="button"
            aria-label={`Set scroll anchor to ${value * 100}% of the viewport`}
            className={cn(
              "flex items-center justify-center rounded-full text-sm px-2 py-1 not-disabled:cursor-pointer text-zinc-100 select-none outline-none focus-visible:ring-[2px] focus-visible:border-ring focus-visible:ring-zinc-500/50",
              value === anchor && "bg-zinc-900 text-zinc-100",
            )}
            onClick={() => setAnchor(value)}
          >
            {value * 100}%
          </button>
        ))}
      </div>
    </div>
  );
}
