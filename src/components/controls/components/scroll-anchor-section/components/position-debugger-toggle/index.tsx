import { useAtom } from "jotai";

import { scrollAnchorDebuggerActiveAtom } from "@/atoms/segment-view";

import { Switch } from "@/components/ui/switch";

export function PositionDebuggerToggle() {
  const [isActive, setIsActive] = useAtom(scrollAnchorDebuggerActiveAtom)

  return (
    <label className="flex items-center justify-between">
      <span className="text-sm text-white/72">Toggle debugger</span>
      <Switch
        className="cursor-pointer"
        checked={isActive}
        onCheckedChange={setIsActive}
      />
    </label>
  )
}
