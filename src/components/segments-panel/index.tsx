import { useAtomValue } from "jotai";

import { currentTrackAtom } from "@/atoms/player";

import { Segments } from "./components/segments";

export function SegmentsPanel() {
  const track = useAtomValue(currentTrackAtom)

  if (!track) {
    return null
  }

  return (
    <Segments segments={track.segments} />
  )
}
