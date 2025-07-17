import { useEffect } from 'react'
import { useSetAtom } from 'jotai';

import { currentTrackAtom } from './atoms/player';
import { tracks } from './data/tracks';

import { SegmentsPanel } from './components/segments-panel';
import { Controls } from './components/controls';
import { Player } from './components/player';

export function App() {
  const setTrack = useSetAtom(currentTrackAtom)

  useEffect(() => {
    setTrack(tracks[0]) // define a faixa padrão
  }, [setTrack])

  return (
    <main className="flex flex-col max-h-[100vh] py-8">
      <SegmentsPanel />

      <Controls />

      <Player />
    </main>
  )
}
