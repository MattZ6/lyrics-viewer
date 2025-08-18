import { useAtomValue } from 'jotai'

import { currentTimeAtom } from '@/atoms/player'

import { formatTime } from '@/utils/duration'

export function CurrentTime() {
  const time = useAtomValue(currentTimeAtom)

  return (
    <span className="text-xs text-white/56 text-left">
      {formatTime(time)}
    </span>
  )
}
