import { useAtomValue } from "jotai";
import { type RefObject, useLayoutEffect, useRef } from "react";

import { scrollAnchorAtom } from "@/atoms/segment-view";

type Props = {
  scrollableContainerRef: RefObject<HTMLUListElement | null>;
};

export function DebuggerLine({ scrollableContainerRef }: Props) {
  const debuggerRef = useRef<HTMLDivElement>(null);
  const scrollAnchor = useAtomValue(scrollAnchorAtom);

  useLayoutEffect(() => {
    if (debuggerRef.current && scrollableContainerRef.current) {
      const scrollableContentHeight =
        scrollableContainerRef.current?.clientHeight ?? 0;
      debuggerRef.current.style.top = `${scrollableContentHeight * scrollAnchor}px`;
    }
  }, [scrollAnchor, scrollableContainerRef]);

  return (
    <div
      ref={debuggerRef}
      className="absolute left-0 right-0 w-full h-0 shrink-0 border-t border-white/24 border-dashed z-10 duration-200 transition-[top] px-4 py-1"
    >
      <span className="hidden md:block select-none text-white/56 text-sm">Scroll anchor position ({scrollAnchor * 100}%)</span>
    </div>
  );
}
