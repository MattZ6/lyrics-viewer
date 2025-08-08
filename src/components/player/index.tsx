import { useAtomValue } from 'jotai'

import { currentTrackAtom } from '@/atoms/player'

import { AudioLoader } from './components/audio-loader'
import { PlayPauseButton } from './components/play-pause-button'
import { CurrentTime } from './components/current-time'
import { Duration } from './components/duration'
import { SeekBar } from './components/seekbar'
import { VolumeControl } from './components/volume'
import { CurrentTrack } from './components/current-track'

export function Player() {
  const track = useAtomValue(currentTrackAtom)

  if (!track) {
    return null
  }

  return (
    <div
      className="flex flex-col gap-2 p-4 w-full max-w-5xl mx-auto border border-border rounded-2xl backdrop-blur-md shadow-lg"
    >
      <AudioLoader />

      <div className="grid grid-cols-3 items-center">
        <CurrentTrack />

        <div className="flex items-center justify-center gap-2">
          <PlayPauseButton />
        </div>

        <div className="flex items-center justify-end gap-2">
          <VolumeControl />
        </div>
      </div>

      <div className="flex flex-col">
        <SeekBar />

        <div className="flex items-center justify-between">
          <CurrentTime />
          <Duration />
        </div>
      </div>
    </div>
  )
}
