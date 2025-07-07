import { atom } from 'jotai'

import { currentTrackAtom, currentTimeAtom } from './player'

// 🔁 Índice do segmento ativo (com base no tempo atual)
export const currentSegmentIndexAtom = atom(get => {
  const track = get(currentTrackAtom)
  const time = get(currentTimeAtom)

  if (!track) {
    return -1
  }

  return track.segments.findIndex(segment => segment.type === 'lyric' && time >= segment.time)
})

// 🔁 Segmento atual completo (opcional)
export const currentSegmentAtom = atom(get => {
  const track = get(currentTrackAtom)
  const index = get(currentSegmentIndexAtom)
  return track?.segments[index] ?? null
})
