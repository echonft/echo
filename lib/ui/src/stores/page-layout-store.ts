import { PageLayoutBackground } from '@echo/ui/constants/page-layout-background'
import { assoc } from 'ramda'
import { create } from 'zustand'

export interface PageLayoutStoreApi {
  background: PageLayoutBackground
  setBackground: (bg: PageLayoutBackground) => void
  reset: VoidFunction
}

export function createPageLayoutStore() {
  return create<PageLayoutStoreApi>((set) => ({
    background: PageLayoutBackground.Default,
    setBackground: (bg) => {
      set(assoc('background', bg))
    },
    reset: () => {
      set(assoc('background', PageLayoutBackground.Default))
    }
  }))
}
