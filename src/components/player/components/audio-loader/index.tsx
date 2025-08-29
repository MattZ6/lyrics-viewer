"use client"

import { useCallback, type SyntheticEvent } from 'react'
import { useAtomValue, useSetAtom } from 'jotai'

import {
  audioRefAtom,
  currentTimeAtom,
  durationAtom,
  currentTrackAtom
} from '@/atoms/player'

type TimeUpdatedEvent = SyntheticEvent<HTMLAudioElement, Event>
type MetadataLoadedEvent = SyntheticEvent<HTMLAudioElement, Event>

export function AudioLoader() {
  const track = useAtomValue(currentTrackAtom)
  const setAudioRef = useSetAtom(audioRefAtom)
  const setCurrentTime = useSetAtom(currentTimeAtom)
  const setDuration = useSetAtom(durationAtom)

  const handleSetAudioRef = useCallback((element: HTMLAudioElement | null) => {
    setAudioRef(element)
  }, [setAudioRef])

  const handleTimeUpdate = useCallback((event: TimeUpdatedEvent) => {
    const { currentTime } = event.currentTarget
    setCurrentTime(currentTime)
  }, [setCurrentTime])

  const handleMetadataLoaded = useCallback((event: MetadataLoadedEvent) => {
    const { duration } = event.currentTarget
    setDuration(duration)
  }, [setDuration])

  if (!track) {
    return null
  }

  return (
    <audio
      ref={handleSetAudioRef}
      src={track.audio}
      onTimeUpdate={handleTimeUpdate}
      onLoadedMetadata={handleMetadataLoaded}
      preload="metadata"
    />
  )
}
