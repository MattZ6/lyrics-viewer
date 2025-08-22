import { ShowTranslationToggle } from "./show-translation-toggle";

export function TranslationSection() {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-white">Translation</span>

      <ShowTranslationToggle />
    </div>
  )
}
