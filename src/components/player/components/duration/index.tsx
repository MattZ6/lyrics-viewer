import { useAtomValue } from 'jotai'

import { durationAtom } from '@/atoms/player'

import { formatTime } from '@/utils/duration'

export function Duration() {
  const time = useAtomValue(durationAtom)

  return (
    <span className="text-xs text-muted-foreground text-right">
      {formatTime(time)}
    </span>
  )
}
