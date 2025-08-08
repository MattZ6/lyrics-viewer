import { useAtomValue } from 'jotai'

import { currentTrackAtom } from '@/atoms/player'
import { currentSegmentAtom } from '@/atoms/segment'

import { AudioLoader } from './components/audio-loader'
import { PlayPauseButton } from './components/play-pause-button'
import { CurrentTime } from './components/current-time'
import { Duration } from './components/duration'
import { SeekBar } from './components/seekbar'
import { VolumeControl } from './components/volume'

export function Player() {
  const track = useAtomValue(currentTrackAtom)

  if (!track) {
    return null
  }

  return (
    <div
      // absolute left-0 right-0 bottom-8
      className="flex flex-col gap-2 p-4 w-full max-w-5xl mx-auto border border-border rounded-2xl backdrop-blur-md shadow-lg"
    >
      <AudioLoader />

      <div className="grid grid-cols-3 items-center">
        <div className="flex items-center gap-2">
          <div className="size-12 border border-border rounded-md bg-accent">

          </div>

          <div className="flex flex-col">
            <div className="font-medium">{track.title}</div>
            <div className="font-normal text-sm text-muted-foreground">{track.band}</div>
          </div>
        </div>
        <CurrentSegmentPreview />
        {/* <div className="font-medium">{track.title}</div> */}
        <PlayPauseButton />
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


function CurrentSegmentPreview() {
  const currentSegment = useAtomValue(currentSegmentAtom)

  if (!currentSegment) {
    return null
  }

  return (
    <span>
      {currentSegment.text}
    </span>
  )
}
