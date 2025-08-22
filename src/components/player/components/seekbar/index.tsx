import {
  memo,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent,
} from 'react'
import { useAtom, useAtomValue } from 'jotai'

import { useKeyboardShortcut } from '@/hooks/use-keyboard-shortcut'
import { useTrackMarkerSections } from '@/hooks/use-track-marker-sections'

import {
  audioRefAtom,
  currentTimeAtom,
  durationAtom,
} from '@/atoms/player'
import { cn } from '@/lib/utils'

const THUMB_ID = 'seek-bar-thumb'
const SEEK_STEP = 5
const SEEK_STEP_SHIFT = 10


export function SeekBar() {
  const audioRef = useAtomValue(audioRefAtom)
  const duration = useAtomValue(durationAtom)
  const [currentTime, setCurrentTime] = useAtom(currentTimeAtom)

  const barRef = useRef<HTMLDivElement>(null)
  const thumbRef = useRef<HTMLButtonElement>(null)

  const [isDragging, setIsDragging] = useState(false)
  const [showThumb, setShowThumb] = useState(false)
  const [dragTime, setDragTime] = useState<number | null>(null)
  const [hoverTime, setHoverTime] = useState<number | null>(null)
  const [seekFeedback, setSeekFeedback] = useState<string | null>(null)
  const [isSeekingTransiently, setIsSeekingTransiently] = useState(false)

  const effectiveTime = dragTime ?? currentTime
  const percentage = duration > 0 ? (effectiveTime / duration) * 100 : 0
  const seekTranslateXValue = 100 - percentage

  const previewPercentage = duration > 0 && hoverTime !== null
    ? (hoverTime / duration) * 100
    : null

  const updateThumbPosition = useCallback(
    (time: number) => {
      if (!barRef.current || !thumbRef.current) return
      const barRect = barRef.current.getBoundingClientRect()
      const thumbX = (time / duration) * barRect.width
      const scale = showThumb ? 1 : 0

      thumbRef.current.style.transform = `translateX(${thumbX - 8}px) translateY(-50%) scale(${scale})`
    },
    [duration, showThumb]
  )

  useLayoutEffect(() => {
    const barEl = barRef.current
    if (!barEl) return

    const handleEnter = () => setShowThumb(true)
    const handleLeave = () => {
      if (!isDragging) setShowThumb(false)
      setHoverTime(null)
    }

    const handleMove = (e: MouseEvent) => {
      if (!barRef.current || duration === 0) return
      const rect = barRef.current.getBoundingClientRect()
      const x = Math.min(Math.max(e.clientX - rect.left, 0), rect.width)
      const time = (x / rect.width) * duration
      setHoverTime(time)
    }

    barEl.addEventListener('mouseenter', handleEnter)
    barEl.addEventListener('mouseleave', handleLeave)
    barEl.addEventListener('mousemove', handleMove)

    return () => {
      barEl.removeEventListener('mouseenter', handleEnter)
      barEl.removeEventListener('mouseleave', handleLeave)
      barEl.removeEventListener('mousemove', handleMove)
    }
  }, [isDragging, duration])

  useLayoutEffect(() => {
    if (!isDragging) {
      updateThumbPosition(currentTime)
    }
  }, [currentTime, duration, isDragging, updateThumbPosition])

  const startSeeking = useCallback((clientX: number) => {
    if (!barRef.current || duration === 0 || !thumbRef.current) return

    const barRect = barRef.current.getBoundingClientRect()
    const clampedX = Math.min(Math.max(clientX - barRect.left, 0), barRect.width)
    const initialTime = (clampedX / barRect.width) * duration

    setIsDragging(true)
    setDragTime(initialTime)

    thumbRef.current.classList.remove('transition-transform')
    updateThumbPosition(initialTime)

    const handleMove = (event: PointerEvent | MouseEvent) => {
      const x = (event as PointerEvent).clientX ?? (event as MouseEvent).clientX
      const clamped = Math.min(Math.max(x - barRect.left, 0), barRect.width)
      const time = (clamped / barRect.width) * duration

      setDragTime(time)
      updateThumbPosition(time)
    }

    const handleUp = (event: PointerEvent | MouseEvent) => {
      const x = (event as PointerEvent).clientX ?? (event as MouseEvent).clientX
      const clamped = Math.min(Math.max(x - barRect.left, 0), barRect.width)
      const finalTime = (clamped / barRect.width) * duration

      setIsDragging(false)
      setDragTime(null)
      setCurrentTime(finalTime)
      setHoverTime(null)

      if (audioRef) {
        audioRef.currentTime = finalTime
      }

      setTimeout(() => {
        thumbRef.current?.classList.add('transition-transform')
      }, 0)

      window.removeEventListener('pointermove', handleMove)
      window.removeEventListener('pointerup', handleUp)
    }

    window.addEventListener('pointermove', handleMove)
    window.addEventListener('pointerup', handleUp)
  }, [audioRef, duration, setCurrentTime, updateThumbPosition])

  const handleBarPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).id === THUMB_ID) return
    e.preventDefault()
    startSeeking(e.clientX)
  }

  const handleThumbPointerDown = (e: PointerEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    startSeeking(e.clientX)
  }

  const showSeekFeedback = (text: string) => {
    setSeekFeedback(text)
    setIsSeekingTransiently(true)

    setTimeout(() => {
      setSeekFeedback(null)
      setIsSeekingTransiently(false)
    }, 600)
  }

  const handleRewind = useCallback((stepInSeconds: number) => {
    if (!audioRef) {
      return
    }

    const newTime = Math.max(audioRef.currentTime - stepInSeconds, 0)
    audioRef.currentTime = newTime
    setCurrentTime(newTime)

    showSeekFeedback(`-${stepInSeconds}s`);

    setDragTime(null)
    setHoverTime(null)
  }, [audioRef, setCurrentTime])

  const handleFastForward = useCallback((stepInSeconds: number) => {
    if (!audioRef) {
      return
    }

    const newTime = Math.min(audioRef.currentTime + stepInSeconds, duration)
    audioRef.currentTime = newTime
    setCurrentTime(newTime)

    showSeekFeedback(`+${stepInSeconds}s`);

    setDragTime(null)
    setHoverTime(null)
  }, [audioRef, duration, setCurrentTime])

  useKeyboardShortcut(["ArrowLeft"], (event) => {
    event.preventDefault()
    handleRewind(SEEK_STEP)
  });

  useKeyboardShortcut(["ArrowRight"], (event) => {
    event.preventDefault()
    handleFastForward(SEEK_STEP)
  });

  useKeyboardShortcut(["Shift+ArrowLeft"], (event) => {
    event.preventDefault()
    handleRewind(SEEK_STEP_SHIFT)
  });

  useKeyboardShortcut(["Shift+ArrowRight"], (event) => {
    event.preventDefault()
    handleFastForward(SEEK_STEP_SHIFT)
  });

  const showHoverBar = previewPercentage !== null && !isDragging;

  return (
    <div
      ref={barRef}
      className={`relative w-full py-4 group ${isDragging ? 'cursor-grabbing' : 'cursor-pointer'}`}
      onPointerDown={handleBarPointerDown}
    >
      {/* Barra de fundo */}
      <div className="w-full h-1.5 bg-white/20 rounded overflow-hidden cursor-pointer relative">

        {/* Barra de preview (hover) */}
        {showHoverBar && (
          <div
            className="absolute left-0 top-0 w-full h-full rounded-full bg-white/20 pointer-events-none transition-opacity"
            style={{
              transform: `translateX(-${100 - previewPercentage}%)`,
              // zIndex: 1,
            }}
          />
        )}

        {/* Barra de progresso (real/drag) */}
        <div
          className={cn(
            "relative h-full rounded-full transition-colors z-1",
            isDragging ? 'bg-gradient-to-r from-orange-200 to-orange-300' : 'bg-gradient-to-r from-orange-200 to-orange-500',
          )}
          style={{
            transform: `translateX(-${seekTranslateXValue}%)`,
          }}
        />
      </div>

      {seekFeedback && (
        <div
          className="absolute left-1/2 -translate-x-1/2 translate-y-2 text-sm px-2 py-1 rounded shadow-md bg-white/10 text-white/56 animate-in transition-all animate-fade-out pointer-events-none"
        >
          {seekFeedback}
        </div>
      )}

      {/* Divisões baseadas em markers */}
      <MarkerDivisions />

      {/* Thumb */}
      <button
        id={THUMB_ID}
        ref={thumbRef}
        type="button"
        className={cn(
          "absolute top-1/2 size-4 bg-orange-600 rounded-full z-20 shadow-md",
          showThumb && !isDragging && !isSeekingTransiently && 'transition-transform',
          isDragging ? 'cursor-grabbing' : 'cursor-pointer'
        )}
        style={{
          transform: `translateX(0px) translateY(-50%) scale(${showThumb ? 1 : 0})`,
        }}
        onPointerDown={handleThumbPointerDown}
        tabIndex={-1}
        aria-hidden
      />
    </div>
  )
}

export const MarkerDivisions = memo(function MarkerDivisions() {
  const markerSections = useTrackMarkerSections()
  const duration = useAtomValue(durationAtom)

  if (!markerSections.length || duration === 0) {
    return null
  }

  return (
    <>
      {markerSections.map((section, index) => (
        <MarkerDivision
          key={index}
          label={section.label}
          left={(section.startTime / duration) * 100}
          width={((section.endTime - section.startTime) / duration) * 100}
          isLast={markerSections.length - 1 === index}
        />
      ))}
    </>
  )
})

type MarkerDivisionProps = {
  label: string
  left: number
  width: number
  isLast: boolean
}

export function MarkerDivision({ label, left, width }: MarkerDivisionProps) {
  const [showLabel, setShowLabel] = useState(false)

  return (
    <div
      key={`${label}_${left}`}
      className={cn(
        "absolute top-0 h-full  z-2 flex items-end justify-center",
        // !isLast && "border-r-2 border-background"
      )}
      style={{ left: `${left}%`, width: `${width}%` }}
      onMouseEnter={() => setShowLabel(true)}
      onMouseLeave={() => setShowLabel(false)}
    >
      <span
        className={cn(
          "absolute -top-0.5 left-0 text-xs text-white/36 pointer-events-none opacity-0 translate-y-1 transition-all",
          showLabel ? "opacity-100 translate-y-0" : "",
        )}
      >
        {label}
      </span>
    </div>
  )
}
