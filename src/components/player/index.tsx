"use client";

import { useAtomValue } from "jotai";

import { currentTrackAtom } from "@/atoms/player";

import { AudioLoader } from "./components/audio-loader";
import { CurrentTime } from "./components/current-time";
import { CurrentTrack } from "./components/current-track";
import { Duration } from "./components/duration";
import { PlayPauseButton } from "./components/play-pause-button";
import { SeekBar } from "./components/seekbar";
import { VolumeControl } from "./components/volume";

export function Player() {
  const track = useAtomValue(currentTrackAtom);

  if (!track) {
    return null;
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 pb-4">
      <div className="flex flex-col md:gap-2 p-4 pb-0 md:pb-4 border rounded-xl bg-gradient-to-tr from-zinc-950 to-zinc-800 border-zinc-800">
        <AudioLoader />

        <div className="grid grid-cols-2 md:grid-cols-3 items-center">
          <CurrentTrack />

          <div className="flex items-center justify-end md:justify-center gap-2">
            <PlayPauseButton />
          </div>

          <div className="hidden md:flex items-center justify-end gap-2">
            <VolumeControl />
          </div>
        </div>

        <div className="flex flex-col">
          <SeekBar />

          <div className="hidden md:flex items-center justify-between">
            <CurrentTime />
            <Duration />
          </div>
        </div>
      </div>
    </div>
  );
}
