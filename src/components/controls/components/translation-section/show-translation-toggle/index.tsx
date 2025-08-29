"use client"

import { useAtom } from "jotai";

import { showTranslatedTextAtom } from "@/atoms/segment-view";

import { Switch } from "@/components/ui/switch";

export function ShowTranslationToggle() {
  const [showTranslation, toggleTranslationVisibility] = useAtom(showTranslatedTextAtom)

  return (
    <label className="flex items-center justify-between">
      <span className="text-sm text-zinc-400">Show translation</span>
      <Switch
        className="cursor-pointer"
        checked={showTranslation}
        onCheckedChange={toggleTranslationVisibility}
      />
    </label>
  )
}
