import { HeaderStyle } from '@echo/ui/constants/header-style'
import { assoc } from 'ramda'
import { create } from 'zustand'

export interface HeaderStoreApi {
  style: HeaderStyle
  setStyle: (style: HeaderStyle) => void
  reset: VoidFunction
}

export function createHeaderStore() {
  return create<HeaderStoreApi>((set) => ({
    style: HeaderStyle.Default,
    setStyle: (style) => {
      set(assoc('style', style))
    },
    reset: () => {
      set(assoc('style', HeaderStyle.Default))
    }
  }))
}
