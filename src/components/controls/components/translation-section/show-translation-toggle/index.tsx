"use client";

import { useAtom } from "jotai";

import { showTranslatedTextAtom } from "@/atoms/segment-view";

import { Switch } from "@/components/ui/switch";

export function ShowTranslationToggle() {
  const [showTranslation, toggleTranslationVisibility] = useAtom(
    showTranslatedTextAtom,
  );

  return (
    <label
      htmlFor="show-translation"
      className="flex items-center justify-between"
    >
      <span className="text-sm text-zinc-400">Show translation</span>
      <Switch
        id="show-translation"
        className="cursor-pointer"
        checked={showTranslation}
        onCheckedChange={toggleTranslationVisibility}
      />
    </label>
  );
}
