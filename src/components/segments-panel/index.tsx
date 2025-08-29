"use client"

import { useAtomValue } from "jotai";

import { currentTrackAtom } from "@/atoms/player";

import { Segments } from "./components/segments";

export function SegmentsPanel() {
  const track = useAtomValue(currentTrackAtom)

  return (
    <Segments segments={track.segments} />
  )
}
