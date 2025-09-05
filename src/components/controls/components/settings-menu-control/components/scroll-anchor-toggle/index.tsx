"use client";

import { useAtom } from "jotai";

import { autoScrollAtom } from "@/atoms/segment-view";

import { Switch } from "@/components/ui/switch";

export function ScrollAnchorToggle() {
  const [isActive, setIsActive] = useAtom(autoScrollAtom);

  return (
    <label
      htmlFor="anchor-toggle"
      className="flex items-center justify-between"
    >
      <span className="font-medium text-sm text-white selection:bg-white selection:text-black">
        Anchor
      </span>
      <Switch
        id="anchor-toggle"
        className="cursor-pointer"
        checked={isActive}
        onCheckedChange={setIsActive}
      />
    </label>
  );
}
