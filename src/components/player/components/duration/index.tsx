import { useAtomValue } from 'jotai'

import { durationAtom } from '@/atoms/player'

import { formatTime } from '@/utils/duration'

export function Duration() {
  const time = useAtomValue(durationAtom)

  return (
    <small className="text-xs text-zinc-500 text-right selection:bg-zinc-50 selection:text-zinc-950">
      {formatTime(time)}
    </small>
  )
}
