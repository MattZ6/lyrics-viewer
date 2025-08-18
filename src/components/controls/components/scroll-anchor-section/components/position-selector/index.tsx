import { useAtom } from "jotai";

import { scrollAnchorAtom } from "@/atoms/segment-view";
import { cn } from "@/lib/utils";

const OPTIONS = [0.3, 0.5, 0.75]

export function PositionSelector() {
  const [anchor, setAnchor] = useAtom(scrollAnchorAtom);

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm text-white/72">Position</span>
      <div className="flex items-center self-start p-1 rounded-full bg-white/10">
        {
          OPTIONS.map((value) => (
            <button
              key={value}
              type="button"
              className={cn(
                "flex items-center justify-center rounded-full text-sm px-2 py-1 not-disabled:cursor-pointer text-white/84",
                value === anchor && "bg-black text-white"
              )}
              onClick={() => setAnchor(value)}
            >
              {value * 100}%
            </button>
          ))
        }
      </div>
      {/* <div className="flex items-center gap-2">
        {
          OPTIONS.map((value) => (
            <button
              key={value}
              type="button"
              className={cn(
                "flex items-center justify-center size-8 rounded-md border border-border text-xs text-muted-foreground not-disabled:cursor-pointer",
                value === anchor ? 'bg-primary text-primary-foreground border-primary' : ''
              )}
              onClick={() => setAnchor(value)}
            >
              {value * 100}%
            </button>
          ))
        }
      </div> */}
    </div>
  );
}
