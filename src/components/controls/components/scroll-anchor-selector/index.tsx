import { useAtom } from "jotai";

import { scrollAnchorAtom } from "@/atoms/segment-view";

const OPTIONS = [0.3, 0.5, 0.75]

export function ScrollAnchorSelector() {
  const [anchor, setAnchor] = useAtom(scrollAnchorAtom);

  return (
    <div className="flex gap-2">
      {OPTIONS.map((value) => (
        <button
          key={value}
          type="button"
          onClick={() => setAnchor(value)}
          className={value === anchor ? "font-bold" : ""}
        >
          {value * 100}%
        </button>
      ))}
    </div>
  );
}
