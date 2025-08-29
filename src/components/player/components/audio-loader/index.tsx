"use client";

import { useAtomValue, useSetAtom } from "jotai";
import { type SyntheticEvent, useCallback } from "react";

import {
  audioRefAtom,
  currentTimeAtom,
  currentTrackAtom,
  durationAtom,
} from "@/atoms/player";

type TimeUpdatedEvent = SyntheticEvent<HTMLAudioElement, Event>;
type MetadataLoadedEvent = SyntheticEvent<HTMLAudioElement, Event>;

export function AudioLoader() {
  const track = useAtomValue(currentTrackAtom);
  const setAudioRef = useSetAtom(audioRefAtom);
  const setCurrentTime = useSetAtom(currentTimeAtom);
  const setDuration = useSetAtom(durationAtom);

  const handleSetAudioRef = useCallback(
    (element: HTMLAudioElement | null) => {
      setAudioRef(element);
    },
    [setAudioRef],
  );

  const handleTimeUpdate = useCallback(
    (event: TimeUpdatedEvent) => {
      const { currentTime } = event.currentTarget;
      setCurrentTime(currentTime);
    },
    [setCurrentTime],
  );

  const handleMetadataLoaded = useCallback(
    (event: MetadataLoadedEvent) => {
      const { duration } = event.currentTarget;
      setDuration(duration);
    },
    [setDuration],
  );

  if (!track) {
    return null;
  }

  return (
    // biome-ignore lint/a11y/useMediaCaption: It doesn't have captions
    <audio
      ref={handleSetAudioRef}
      src={track.audio}
      translate="no"
      onTimeUpdate={handleTimeUpdate}
      onLoadedMetadata={handleMetadataLoaded}
      preload="metadata"
    />
  );
}
