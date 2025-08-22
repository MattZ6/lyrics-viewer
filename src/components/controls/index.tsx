import { cn } from "@/lib/utils";
import { ScrollAnchorSection } from "./components/scroll-anchor-section";
import { TranslationSection } from "./components/translation-section";

export function Controls() {
  return (
    <div
      className={cn(
        "absolute top-40 right-8 hidden flex-col gap-4 min-w-3xs py-2 px-3 rounded-xl border shadow-sm z-10 bg-white/10 border-white/10",
        "md:flex"
      )}
    >
      <small className="text-xs text-white/56">
        Configurations
      </small>

      <ScrollAnchorSection />

      <TranslationSection />
    </div>
  )
}
