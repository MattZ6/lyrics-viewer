import { SegmentsPanel } from "@/components/segments-panel";
import { Controls } from "@/components/controls";

import { Header } from "./components/header";
import { Footer } from "./components/footer";

export function HomePage() {
  return (
    <div className="flex flex-col h-[100dvh] bg-black">
      <Header />

      <SegmentsPanel />

      <Controls />

      <Footer />
    </div>
  )
}
