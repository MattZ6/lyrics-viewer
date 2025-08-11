import { memo, type RefObject } from "react"
import { useAtomValue } from "jotai"

import { scrollAnchorDebuggerActiveAtom } from "@/atoms/segment-view"

import { DebuggerLine } from "./components/debugger-line"

type Props = {
  scrollableContainerRef: RefObject<HTMLUListElement | null>
}

export const PositionDebugger = memo(function PositionDebugger(props: Props) {
  const showDebuggerLine = useAtomValue(scrollAnchorDebuggerActiveAtom)

  if (!showDebuggerLine) {
    return null
  }

  return <DebuggerLine {...props} />
})
