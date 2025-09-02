"use client";

import { useAtom } from "jotai";

import { scrollAnchorDebuggerActiveAtom } from "@/atoms/segment-view";

import { Switch } from "@/components/ui/switch";

export function PositionDebuggerToggle() {
  const [isActive, setIsActive] = useAtom(scrollAnchorDebuggerActiveAtom);

  return (
    <label
      htmlFor="debugger-toggle"
      className="flex items-center justify-between"
    >
      <span className="font-medium text-sm text-white selection:bg-white selection:text-black">Show debugger</span>
      <Switch
        id="debugger-toggle"
        className="cursor-pointer"
        checked={isActive}
        onCheckedChange={setIsActive}
      />
    </label>
  );
}
