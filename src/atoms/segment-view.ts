import { atom } from 'jotai'

// Ponto âncora da tela para scroll — valores: 0.3 (30%), 0.5 (50%), etc.
export const scrollAnchorAtom = atom(0.5)

export const scrollAnchorDebuggerActiveAtom = atom(false)

export const showTranslatedTextAtom = atom(true)
