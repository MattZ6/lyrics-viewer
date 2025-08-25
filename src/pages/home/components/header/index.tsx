import { cn } from "@/lib/utils";
import { AppName } from "./components/app-name";
import { SongSwitcher } from "./components/song-switcher";

export function   Header() {
  return (
    <header
      className={cn(
        "grid grid-cols-2 p-4",
        "md:grid-cols-3 md:p-6"
      )}
    >
      <SongSwitcher />

      <AppName />
    </header>
  )
}
