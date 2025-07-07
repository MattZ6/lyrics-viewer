import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent,
} from 'react'
import { useAtom, useAtomValue } from 'jotai'

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
    }, 600) // ou menos, tipo 300ms se preferir
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!audioRef || duration === 0) return

      const step = event.shiftKey ? SEEK_STEP_SHIFT : SEEK_STEP
      let newTime = audioRef.currentTime

      if (event.key === 'ArrowRight') {
        newTime = Math.min(newTime + step, duration)
        showSeekFeedback(`+${step}s`)
      } else if (event.key === 'ArrowLeft') {
        newTime = Math.max(newTime - step, 0)
        showSeekFeedback(`-${step}s`)
      } else {
        return
      }

      event.preventDefault()
      audioRef.currentTime = newTime
      setCurrentTime(newTime)
      setDragTime(null)
      setHoverTime(null)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [audioRef, duration, setCurrentTime])

  return (
    <div
      ref={barRef}
      className={`relative w-full py-4 group ${isDragging ? 'cursor-grabbing' : 'cursor-pointer'}`}
      onPointerDown={handleBarPointerDown}
    >
      {/* Barra de fundo */}
      <div className="w-full h-1.5 bg-primary/10 rounded-full overflow-hidden cursor-pointer relative">
        {/* Barra de preview (hover) */}
        {previewPercentage !== null && !isDragging && (
          <div
            className="absolute left-0 top-0 w-full h-full rounded-full bg-primary/15 pointer-events-none"
            style={{
              transform: `translateX(-${100 - previewPercentage}%)`,
              zIndex: 1,
            }}
          />
        )}

        {/* Barra de progresso (real/drag) */}
        <div
          className={cn(
            "relative h-full rounded-full transition-colors z-10",
            isDragging ? 'bg-orange-700' : 'bg-orange-600',
          )}
          style={{
            transform: `translateX(-${seekTranslateXValue}%)`,
          }}
        />
      </div>

      {seekFeedback && (
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full text-sm font-medium px-2 py-1 rounded shadow-md bg-accent/10 animate-fade-out pointer-events-none z-20"
        >
          {seekFeedback}
        </div>
      )}

      {/* Thumb */}
      <button
        id={THUMB_ID}
        ref={thumbRef}
        type="button"
        className={cn(
          "absolute top-1/2 size-4 bg-orange-600 border rounded-full z-10 opacity-50",
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
