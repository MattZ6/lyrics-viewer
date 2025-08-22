import { SegmentsPanel } from "@/components/segments-panel";
import { Controls } from "@/components/controls";

import { BackgroundImage } from "./components/background-image";
import { Header } from "./components/header";
import { Footer } from "./components/footer";

export function HomePage() {
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
