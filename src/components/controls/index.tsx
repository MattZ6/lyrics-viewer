import { ScrollAnchorSelector } from "./components/scroll-anchor-selector";

export function Controls() {
  return (
    <div
      className="absolute top-40 right-8 flex flex-col gap-4 min-w-3xs py-2 px-3 rounded-xl border border-border"
    >
      <small className="text-xs text-muted-foreground">
        Configurations
      </small>

      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium">Scroll anchor</span>
        <ScrollAnchorSelector />
      </div>
    </div>
  )
}
