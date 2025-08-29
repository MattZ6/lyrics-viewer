import { useAtomValue } from "jotai";

import { currentTimeAtom } from "@/atoms/player";

import { formatTime } from "@/utils/duration";

export function CurrentTime() {
  const time = useAtomValue(currentTimeAtom);

  return (
    <span className="text-xs text-zinc-500 text-left selection:bg-zinc-50 selection:text-zinc-950">
      {formatTime(time)}
    </span>
  );
}
