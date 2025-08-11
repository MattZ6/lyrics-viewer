import { useAtom } from "jotai";

import { scrollAnchorAtom } from "@/atoms/segment-view";
import { cn } from "@/lib/utils";

const OPTIONS = [0.3, 0.5, 0.75]

export function PositionSelector() {
  const [anchor, setAnchor] = useAtom(scrollAnchorAtom);

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm">Position</span>
      <div className="flex items-center gap-2">
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
      </div>
    </div>
  );
}
