import { useEffect } from "react";
import { useSetAtom } from "jotai";

import { currentTrackAtom } from "@/atoms/player";

import { tracks } from "@/data/tracks";

import { SegmentsPanel } from "@/components/segments-panel";
import { Controls } from "@/components/controls";

import { BackgroundImage } from "./components/background-image";
import { Header } from "./components/header";
import { Footer } from "./components/footer";

export function HomePage() {
  const setTrack = useSetAtom(currentTrackAtom)

  useEffect(() => {
    setTrack(tracks[0])
  }, [setTrack])

  return (
    <BackgroundImage>
      <main
        className="flex flex-col h-[100vh] bg-black/50 backdrop-blur-[48px]"
      >
        <Header />

        <SegmentsPanel />

        <Controls />

        <Footer />
      </main>
    </BackgroundImage>
  )
}
