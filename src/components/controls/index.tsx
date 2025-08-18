import { ScrollAnchorSection } from "./components/scroll-anchor-section";

export function Controls() {
  return (
    <div
      className="absolute top-40 right-8 flex flex-col gap-4 min-w-3xs py-2 px-3 rounded-xl border shadow-sm z-10 bg-white/10 border-white/10"
    >
      <small className="text-xs text-white/56">
        Configurations
      </small>

      <ScrollAnchorSection />
    </div>
  )
}
