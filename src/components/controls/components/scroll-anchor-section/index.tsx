import { PositionDebuggerToggle } from "./components/position-debugger-toggle";
import { PositionSelector } from "./components/position-selector";

export function ScrollAnchorSection() {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-white">Scroll anchor</span>

      <PositionSelector />

      <PositionDebuggerToggle />
    </div>
  )
}
