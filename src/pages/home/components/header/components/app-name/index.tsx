import { cn } from "@/lib/utils"
import { AudioLines } from "lucide-react"

export function AppName() {
  return (
    <div
      className={cn(
        "flex items-center gap-2 w-fit py-2 px-3 rounded-full bg-gradient-to-tr from-zinc-900 to-zinc-800 border border-zinc-800 text-white",
        "md:self-center md:justify-self-center"
      )}
    >
      <AudioLines className="size-5" />
      <span className="text-sm">Lyrics Viewer</span>
    </div>
  )
}
