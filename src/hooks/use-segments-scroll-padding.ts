import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";

import { scrollAnchorAtom } from "@/atoms/segment-view";

export function useSegmentsScrollPadding(
  lyricHeight = 48, // altura média do segmento de letra (em px)
  markerHeight = 24, // altura média do marker (em px)
) {
  const anchor = useAtomValue(scrollAnchorAtom);
  const [topPadding, setTopPadding] = useState(0);
  const [bottomPadding, setBottomPadding] = useState(0);

  useEffect(() => {
    const update = () => {
      const viewportHeight = window.innerHeight;

      const baseOffset = lyricHeight / 2 + markerHeight;

      const top = viewportHeight * anchor - baseOffset;
      const bottom = viewportHeight * (1 - anchor) - baseOffset;

      setTopPadding(Math.max(0, top));
      setBottomPadding(Math.max(0, bottom));
    };

    update();

    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [anchor, lyricHeight, markerHeight]);

  return { topPadding, bottomPadding };
}
