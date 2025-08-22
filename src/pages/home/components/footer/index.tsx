import { Player } from "@/components/player";
import { cn } from "@/lib/utils";

export function Footer() {
  return (
    <footer
    className={cn(
      "flex items-center justify-center p-4",
      "md:p-6"
    )}
    >
      <Player />
    </footer>
  )
}
