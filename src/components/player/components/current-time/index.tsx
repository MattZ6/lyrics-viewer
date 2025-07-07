import { useAtomValue } from 'jotai'

import { currentTimeAtom } from '@/atoms/player'

import { formatTime } from '@/utils/duration'

export function CurrentTime() {
  const time = useAtomValue(currentTimeAtom)

  return (
    <span className="text-xs text-muted-foreground text-left">
      {formatTime(time)}
    </span>
  )
}
