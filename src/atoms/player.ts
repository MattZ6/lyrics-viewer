import { atom } from "jotai";

import { tracks } from "@/data/tracks";

export type SegmentType = "lyric" | "marker";

export type MarkerSegment = {
  type: "marker";
  text: string;
};

export type LyricSegment = {
  type: "lyric";
  time: number;
  text: string;
  translatedText?: string;
};

export type Segment = MarkerSegment | LyricSegment;

export type Track = {
  id: string;
  title: string;
  band: string;
  thumb: string;
  audio: string; // path para mp3
  segments: Segment[];
};

// 🎵 Faixa atualmente selecionada
export const currentTrackAtom = atom<Track>(tracks[0]);

// 🎧 Referência do <audio>
export const audioRefAtom = atom<HTMLAudioElement | null>(null);

// ▶️ Está tocando ou não
export const isPlayingAtom = atom(false);

// ⏱ Tempo atual (em segundos)
export const currentTimeAtom = atom(0);

// ⏳ Duração total (em segundos)
export const durationAtom = atom(0);

export const volumeAtom = atom(1);
