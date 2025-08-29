import { useAtomValue } from "jotai";
import type { HTMLAttributes } from "react";

import { currentTrackAtom } from "@/atoms/player";

type Props = HTMLAttributes<HTMLDivElement>;

export function BackgroundImage(props: Props) {
  const currentTrack = useAtomValue(currentTrackAtom);

  return (
    <div
      style={{
        backgroundImage: `url(${currentTrack.thumb})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      {...props}
    />
  );
}
