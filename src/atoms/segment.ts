// biome-ignore assist/source/organizeImports: Sort was doesn't working in this case
import { atom } from "jotai";
import { currentTrackAtom, currentTimeAtom } from "@/atoms/player";

// 🔁 Índice do segmento ativo (com base no tempo atual)
export const currentSegmentIndexAtom = atom((get) => {
  const track = get(currentTrackAtom);
  const time = get(currentTimeAtom);

  if (!track) return -1;

  const segments = track.segments;

  for (let i = segments.length - 1; i >= 0; i--) {
    const segment = segments[i];
    if (segment.type === "lyric" && segment.time <= time) {
      return i;
    }
  }

  return -1;
});

// 🔁 Segmento atual completo (opcional)
export const currentSegmentAtom = atom((get) => {
  const track = get(currentTrackAtom);
  const index = get(currentSegmentIndexAtom);
  return track?.segments[index] ?? null;
});
