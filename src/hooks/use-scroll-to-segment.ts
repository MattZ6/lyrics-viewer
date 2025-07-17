import { type RefObject, useEffect, useRef } from "react";
import { useAtomValue } from "jotai";

import { scrollAnchorAtom } from "@/atoms/segment-view";

export function useScrollToSegment(
  selectedSegmentIndex: number,
  scrollableContainerRef: RefObject<HTMLElement | null>,
  segmentsRef: RefObject<HTMLElement | null>[]
) {
  const scrollAnchor = useAtomValue(scrollAnchorAtom);

  const prevSelectedIndexRef = useRef(selectedSegmentIndex)
  const prevScrollAnchorRef = useRef(scrollAnchor)


  useEffect(() => {
    const scrollContainerElement = scrollableContainerRef.current;
    const segmentElement = segmentsRef[selectedSegmentIndex]?.current;

    if (!scrollContainerElement || !segmentElement) {
      return;
    }

    const frame = requestAnimationFrame(() => {
      // setTimeout(() => {
      const scrollableContainerRect = scrollContainerElement.getBoundingClientRect();
      const segmentElementRect = segmentElement.getBoundingClientRect();

      const currentScrollTop = scrollContainerElement.scrollTop;
      const delta = segmentElementRect.top - scrollableContainerRect.top;

      const offset =
        delta - (scrollContainerElement.clientHeight * scrollAnchor) + (segmentElement.offsetHeight / 2);

      // const selectedSegmentIndexChanged = prevSelectedIndexRef.current !== selectedSegmentIndex
      // const scrollAnchorChanged = prevScrollAnchorRef.current !== scrollAnchor;


      scrollContainerElement.scrollTo({
        top: currentScrollTop + offset,
        behavior: 'smooth',
        // behavior: !selectedSegmentIndexChanged && scrollAnchorChanged ? "instant" : "smooth",
      });

      prevSelectedIndexRef.current = selectedSegmentIndex;
      prevScrollAnchorRef.current = scrollAnchor;
      // }, 0);
    });

    return () => cancelAnimationFrame(frame);
  }, [selectedSegmentIndex, scrollAnchor, scrollableContainerRef, segmentsRef]);
}
