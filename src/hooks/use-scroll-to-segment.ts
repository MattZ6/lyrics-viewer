"use client";

import { useAtomValue } from "jotai";
import { type RefObject, useCallback, useLayoutEffect, useRef } from "react";

import { scrollAnchorAtom, showTranslatedTextAtom } from "@/atoms/segment-view";

type ScrollToSelectedSegmentInput = {
  animate: boolean;
};

export function useScrollToSegment(
  selectedSegmentIndex: number,
  scrollableContainerRef: RefObject<HTMLElement | null>,
  segmentsRef: RefObject<HTMLElement | null>[],
) {
  const showTranslatedText = useAtomValue(showTranslatedTextAtom);
  const scrollAnchor = useAtomValue(scrollAnchorAtom);

  const isFirstRenderRef = useRef(true);
  const translationEnabledRef = useRef(showTranslatedText);

  const scrollToSelectedSegment = useCallback(
    ({ animate }: ScrollToSelectedSegmentInput = { animate: false }) => {
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

      scrollContainerElement.scrollTo({
        top: newScrollPosition,
        behavior: animate ? "smooth" : "instant",
      });
    },
    [
      scrollAnchor,
      selectedSegmentIndex,
      scrollableContainerRef,
      segmentsRef[selectedSegmentIndex]?.current,
    ],
  );

  useLayoutEffect(() => {
    scrollToSelectedSegment({ animate: !isFirstRenderRef.current });
  }, [scrollToSelectedSegment]);

  useLayoutEffect(() => {
    if (translationEnabledRef.current !== showTranslatedText) {
      scrollToSelectedSegment({ animate: false });
    }

    translationEnabledRef.current = showTranslatedText;
  }, [scrollToSelectedSegment, showTranslatedText]);
}
