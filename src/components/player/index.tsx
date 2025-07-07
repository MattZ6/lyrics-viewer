import { useAtomValue } from 'jotai'

import { currentTrackAtom } from '@/atoms/player'

import { AudioLoader } from './components/audio-loader'
import { PlayPauseButton } from './components/play-pause-button'
import { CurrentTime } from './components/current-time'
import { Duration } from './components/duration'
import { SeekBar } from './components/seekbar'

export function Player() {
  const track = useAtomValue(currentTrackAtom)

  if (!track) {
    return null
  }

  return (
    <div
      className="absolute left-0 right-0 bottom-8 p-4 w-full max-w-5xl mx-auto border border-border rounded-2xl backdrop-blur-md shadow-lg"
    >
      <AudioLoader />

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="size-12 border border-border rounded-md bg-accent">

          </div>

          <div className="flex flex-col">
            <div className="font-medium">{track.title}</div>
            <div className="font-normal text-sm text-muted-foreground">{track.band}</div>
          </div>
        </div>
        <div className="font-medium">{track.title}</div>
        <PlayPauseButton />
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
