import { AnimatedLogo } from "./components/animated-logo";

export function Brand() {
  return (
    <div className="flex items-center gap-2 text-white">
      <AnimatedLogo size={24} />
      <span className="font-medium text-base select-none">Lyrics Viewer</span>
    </div>
  )
}
