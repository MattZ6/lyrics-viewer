import { useCallback, useEffect, useMemo } from "react";
import { useAtom, useAtomValue } from "jotai";
import { Volume, Volume1, Volume2, VolumeX } from "lucide-react";

import { audioRefAtom, volumeAtom } from "@/atoms/player";

import { Slider } from "@/components/ui/slider";

export function VolumeControl() {
  const audioRef = useAtomValue(audioRefAtom)
  const [volume, setVolume] = useAtom(volumeAtom)

  const handleVolumeChange = useCallback(
    ([value]: number[]) => setVolume(value),
    [setVolume]
  )

  useEffect(() => {
    if (audioRef) {
      audioRef.volume = volume
    }
  }, [audioRef, volume])

  const Icon = useMemo(() => {
    if (volume > 0.75) {
      return Volume2
    }

    if (volume > 0.25) {
      return Volume1
    }

    if (volume > 0) {
      return Volume
    }


    return VolumeX
  }, [volume])

  return (
    <div className="flex items-center gap-2">
      <Icon className="size-4 shrink-0" />
      <Slider
        className="w-[100px]"
        value={[volume]}
        min={0}
        max={1}
        step={0.01}
        onValueChange={handleVolumeChange}
      />
    </div>
  )
}
