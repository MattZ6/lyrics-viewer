import { Player } from "@/components/player";
import { cn } from "@/lib/utils";

export function Footer() {
  return (
    <footer
      className={cn(
        "absolute bottom-0 left-0 right-0 flex items-center justify-center p-4",
        "md:p-6 md:static"
      )}
    >
      <Player />
    </footer>
  )
}
