import { HeaderStyle } from '@echo/ui/constants/header-style'
import { assoc } from 'ramda'
import { create } from 'zustand'

interface HeaderStore {
  style: HeaderStyle
  setStyle: (style: HeaderStyle) => void
  reset: VoidFunction
}

export const useHeaderStore = create<HeaderStore>((set) => ({
  style: HeaderStyle.Default,
  setStyle: (style) => {
    set(assoc('style', style))
  },
  reset: () => {
    set(assoc('style', HeaderStyle.Default))
  }
}))
