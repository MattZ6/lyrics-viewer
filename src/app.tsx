// import { useEffect } from 'react'
// import { useSetAtom } from 'jotai';

import { HomePage } from "./pages/home";

// import { currentTrackAtom } from './atoms/player';
// import { tracks } from './data/tracks';

// import { SegmentsPanel } from './components/segments-panel';
// import { Controls } from './components/controls';
// import { Player } from './components/player';
// import { Header } from './components/header';

// export function App() {
//   const setTrack = useSetAtom(currentTrackAtom)

//   useEffect(() => {
//     setTrack(tracks[0])
//   }, [setTrack])

//   return (
//     <main className="flex flex-col max-h-[100vh] py-8">
//       <Header />

//       <SegmentsPanel />

//       <Controls />

//       <Player />
//     </main>
//   )
// }

export function App() {
  return <HomePage />;
}
