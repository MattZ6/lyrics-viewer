import { cn } from "@/lib/utils";
import { TranslationToggleControl } from "./components/translation-toggle-control";

export function Controls() {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 p-1 rounded-full bg-zinc-800 border border-zinc-700",
        "absolute right-4 bottom-0 top-0 mb-[144px] self-center",
      )}
    >
      <TranslationToggleControl />
    </div>
  );
}
