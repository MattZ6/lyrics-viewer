import { Controls } from "@/components/controls";
import { Header } from "@/components/header";
import { Player } from "@/components/player";
import { SegmentsPanel } from "@/components/segments-panel";

export default function HomePage() {
  return (
    <div className="flex flex-col h-dvh ">
      <Header />

      <SegmentsPanel />

      <Controls />

      <Player />
    </div>
  );
}
