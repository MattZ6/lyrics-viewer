"use client";

import { useAtomValue } from "jotai";
import { useEffect, useRef } from "react";
import { isPlayingAtom } from "@/atoms/player";
import { env } from "@/config/env";
import { AnimatedLogo,type AnimatedLogoHandle } from "./components/animated-logo";

export function Brand() {
  const animatedLogoRef = useRef< AnimatedLogoHandle>(null);
  const isPlaying = useAtomValue(isPlayingAtom);

  useEffect(() => {
    if(isPlaying) {
      animatedLogoRef.current?.startAnimation()
    }else {
      animatedLogoRef.current?.stopAnimation()
    }
  }, [isPlaying]);

  return (
    <div className="flex items-center gap-2 text-white">
      <AnimatedLogo ref={animatedLogoRef} size={24} />
      <span className="font-medium text-base select-none">{env.appName}</span>
    </div>
  );
}
