import { useAtom, useAtomValue } from "jotai";
import { Pause, Play } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { audioRefAtom, isPlayingAtom } from "@/atoms/player";
import { useKeyboardShortcut } from "@/hooks/use-keyboard-shortcut";

import { cn } from "@/lib/utils";

export function PlayPauseButton() {
  const audioRef = useAtomValue(audioRefAtom);
  const [isPlaying, setIsPlaying] = useAtom(isPlayingAtom);
  const [isAnimating, setIsAnimating] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useKeyboardShortcut([" ", "P"], (event) => {
    event.preventDefault();
    handleToggle();

    setIsAnimating(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => setIsAnimating(false), 300);
  });

  const handleToggle = useCallback(() => {
    if (!audioRef) {
      return;
    }

    if (audioRef.paused) {
      audioRef.play();
    } else {
      audioRef.pause();
    }
  }, [audioRef]);

  useEffect(() => {
    if (!audioRef) {
      return;
    }

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    audioRef.addEventListener("play", handlePlay);
    audioRef.addEventListener("pause", handlePause);
    audioRef.addEventListener("ended", handleEnded);

    return () => {
      audioRef.removeEventListener("play", handlePlay);
      audioRef.removeEventListener("pause", handlePause);
      audioRef.removeEventListener("ended", handleEnded);
    };
  }, [audioRef, setIsPlaying]);

  return (
    <button
      type="button"
      aria-label={isPlaying ? "Pause" : "Play"}
      className={cn(
        "flex items-center justify-center size-10 md:size-12 rounded-full not-disabled:cursor-pointer bg-zinc-950 text-zinc-50 ring-zinc-700 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none relative overflow-hidden transition-[color,box-shadow,transform,translate,scale,rotate]",
        isAnimating ? "scale-115" : "scale-100",
      )}
      onClick={handleToggle}
    >
      <Play
        className={cn(
          "absolute size-4 md:size-6 transition-all duration-200 ease-in-out transform",
          isPlaying
            ? "opacity-0 scale-75 rotate-[-90deg]"
            : "opacity-100 scale-100 rotate-0",
        )}
      />

      <Pause
        className={cn(
          "absolute size-4 md:size-6 transition-all duration-200 ease-in-out transform",
          isPlaying
            ? "opacity-100 scale-100 rotate-0"
            : "opacity-0 scale-75 rotate-90",
        )}
      />
    </button>
  );
}
