import { AudioLines } from "lucide-react"

export function AppName() {
  return (
    <div className="flex items-center self-center justify-self-center gap-2 w-fit py-2 px-3 rounded-full bg-white/10 border border-white/10 text-white">
      <AudioLines className="size-5" />
      <span className="text-sm">Lyrics Viewer</span>
    </div>
  )
}
