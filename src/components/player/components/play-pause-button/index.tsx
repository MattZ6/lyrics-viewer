import { useCallback, useEffect, useRef, useState } from 'react'
import { useAtom, useAtomValue } from 'jotai'
import { Play, Pause } from 'lucide-react'

import { audioRefAtom, isPlayingAtom } from '@/atoms/player'

import { cn } from '@/lib/utils'

export function PlayPauseButton() {
  const audioRef = useAtomValue(audioRefAtom)
  const [isPlaying, setIsPlaying] = useAtom(isPlayingAtom)
  const [isAnimating, setIsAnimating] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!audioRef) {
      return
    }

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleEnded = () => setIsPlaying(false)

    audioRef.addEventListener('play', handlePlay)
    audioRef.addEventListener('pause', handlePause)
    audioRef.addEventListener('ended', handleEnded)

    return () => {
      audioRef.removeEventListener('play', handlePlay)
      audioRef.removeEventListener('pause', handlePause)
      audioRef.removeEventListener('ended', handleEnded)
    }
  }, [audioRef, setIsPlaying])

  const handleToggle = useCallback(() => {
    if (!audioRef) return

    if (audioRef.paused) {
      audioRef.play()
    } else {
      audioRef.pause()
    }
  }, [audioRef])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const tag = (event.target as HTMLElement)?.tagName

      const isTyping = tag === 'INPUT' || tag === 'TEXTAREA' || (event.target as HTMLElement)?.isContentEditable

      if (isTyping) {
        return
      }

      const key = event.key.toLowerCase()

      if (key === ' ' || key === 'p') {
        event.preventDefault()
        handleToggle()

        setIsAnimating(true)

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }

        timeoutRef.current = setTimeout(() => setIsAnimating(false), 300)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleToggle])

  return (
    <button
      onClick={handleToggle}
      className={cn(
        'size-10 rounded-full flex items-center justify-center not-disabled:cursor-pointer bg-primary text-primary-foreground relative overflow-hidden transition-transform',
        isAnimating ? 'scale-105 opacity-90' : 'scale-100 opacity-100'
      )}
    >
      <Play
        className={cn(
          'absolute size-5 transition-all duration-200 ease-in-out transform',
          isPlaying ? 'opacity-0 scale-75 rotate-[-90deg]' : 'opacity-100 scale-100 rotate-0'
        )}
      />

      <Pause
        className={cn(
          'absolute size-5 transition-all duration-200 ease-in-out transform',
          isPlaying ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 rotate-90'
        )}
      />
    </button>
  )
}
