import { Header } from "@/components/header";
import { SegmentsPanel } from "@/components/segments-panel";
import { Controls } from "@/components/controls";

import { Footer } from "./components/footer";

export function HomePage() {
  return (
    <div className="flex flex-col h-[100dvh] ">
      <Header />

      <SegmentsPanel />

      <Controls />

      <Footer />

    </div>
  )
}
