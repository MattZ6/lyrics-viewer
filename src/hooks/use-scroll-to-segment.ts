"use client";

import { useAtom, useAtomValue } from "jotai";
import { useIsomorphicLayoutEffect } from "motion/react";
import { type RefObject, useCallback, useRef } from "react";

import { autoScrollAtom, scrollAnchorAtom } from "@/atoms/segment-view";

type ScrollToSelectedSegmentInput = {
  animate: boolean;
};

export function useScrollToSegment(
  selectedSegmentIndex: number,
  scrollableContainerRef: RefObject<HTMLElement | null>,
  segmentsRef: RefObject<HTMLElement | null>[],
) {
  const [autoScroll, setAutoScroll] = useAtom(autoScrollAtom);

  const scrollAnchor = useAtomValue(scrollAnchorAtom);

  const isFirstRenderRef = useRef(true);

  const isProgrammaticScroll = useRef(false);

  const scrollToSelectedSegment = useCallback(
    ({ animate }: ScrollToSelectedSegmentInput = { animate: false }) => {
      if (!autoScroll) {
        return;
      }

      const scrollContainerElement = scrollableContainerRef.current;
      const segmentElement = segmentsRef[selectedSegmentIndex]?.current;

      if (!scrollContainerElement || !segmentElement) {
        return;
      }

      isFirstRenderRef.current = false;

      const scrollableContainerRect =
        scrollContainerElement.getBoundingClientRect();
      const segmentElementRect = segmentElement.getBoundingClientRect();

      const currentScrollTop = scrollContainerElement.scrollTop;
      const delta = segmentElementRect.top - scrollableContainerRect.top;

      const offset =
        delta -
        scrollContainerElement.clientHeight * scrollAnchor +
        segmentElement.offsetHeight / 2;

      const newScrollPosition = currentScrollTop + offset;

      isProgrammaticScroll.current = true;

      scrollContainerElement.scrollTo({
        top: newScrollPosition,
        behavior: animate ? "smooth" : "instant",
      });
    },
    [
      autoScroll,
      scrollAnchor,
      selectedSegmentIndex,
      scrollableContainerRef,
      segmentsRef[selectedSegmentIndex]?.current,
    ],
  );

  useIsomorphicLayoutEffect(() => {
    scrollToSelectedSegment({ animate: !isFirstRenderRef.current });
  }, [scrollToSelectedSegment]);

  useIsomorphicLayoutEffect(() => {
    const scrollContainer = scrollableContainerRef.current;

    if (!scrollContainer) {
      return;
    }

    let timeout: NodeJS.Timeout | null = null;

    const handleScroll = () => {
      if (isProgrammaticScroll.current) {
        if (timeout) {
          clearTimeout(timeout);
        }

        timeout = setTimeout(() => {
          isProgrammaticScroll.current = false;
        }, 100);
      } else {
        setAutoScroll(false);

        if (timeout) {
          clearTimeout(timeout);
        }
      }
    };

    scrollContainer.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, []);
}
