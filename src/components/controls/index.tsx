import { cn } from "@/lib/utils";
import { SettingsMenuControl } from "./components/settings-menu-control";
import { TranslationToggleControl } from "./components/translation-toggle-control";

export function Controls() {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 p-1 rounded-full bg-gradient-to-tr from-zinc-900 to-zinc-800 border border-zinc-800 z-10",
        "absolute right-4 bottom-[124px] md:bottom-0 md:top-0 md:mb-[144px] self-center",
      )}
    >
      <SettingsMenuControl />
      <TranslationToggleControl />
    </div>
  );
}
