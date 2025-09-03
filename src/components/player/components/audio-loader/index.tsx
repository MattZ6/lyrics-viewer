"use client";

import { useAtomValue, useSetAtom } from "jotai";
import { type SyntheticEvent, useCallback, useEffect, useState } from "react";

import {
  audioRefAtom,
  currentTimeAtom,
  currentTrackAtom,
  durationAtom,
} from "@/atoms/player";
import { audioCacheManager } from "@/services/cache-audio-manager";

type TimeUpdatedEvent = SyntheticEvent<HTMLAudioElement, Event>;
type MetadataLoadedEvent = SyntheticEvent<HTMLAudioElement, Event>;

export function AudioLoader() {
  const track = useAtomValue(currentTrackAtom);
  const setAudioRef = useSetAtom(audioRefAtom);
  const setCurrentTime = useSetAtom(currentTimeAtom);
  const setDuration = useSetAtom(durationAtom);

  const [audio, setAudio] = useState<Blob | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);

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

  useEffect(() => {
    if (audio) {
      if (!(audio instanceof Blob)) {
        // TODO: Handle error
        return;
      }

      const objectUrl = URL.createObjectURL(audio);

      setFileUrl(objectUrl);

      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    }
  }, [audio]);

  useEffect(() => {
    async function loadAudioFile() {
      try {
        let blob = await audioCacheManager.getBlobFromCache(track.audio);

        if (!blob) {
          blob = await fetch(track.audio).then((response) => response.blob());

          if (blob) {
            await audioCacheManager.saveBlobToCache(track.audio, blob);
          }
        }

        setAudio(blob);
      } catch {
        // TODO: Handle error
      }
    }

    loadAudioFile();
  }, [track.audio]);

  if (!fileUrl) {
    return null;
  }

  return (
    // biome-ignore lint/a11y/useMediaCaption: It doesn't have captions
    <audio
      ref={handleSetAudioRef}
      src={fileUrl}
      translate="no"
      controls={false}
      onTimeUpdate={handleTimeUpdate}
      onLoadedMetadata={handleMetadataLoaded}
      preload="metadata"
    />
  );
}
