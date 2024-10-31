import { PageLayoutBackground } from '@echo/ui/constants/page-layout-background'
import { assoc } from 'ramda'
import { create } from 'zustand'

interface PageLayoutStore {
  background: PageLayoutBackground
  setBackground: (bg: PageLayoutBackground) => void
  reset: VoidFunction
}

export const usePageLayoutStore = create<PageLayoutStore>((set) => ({
  background: PageLayoutBackground.Default,
  setBackground: (bg) => {
    set(assoc('background', bg))
  },
  reset: () => {
    set(assoc('background', PageLayoutBackground.Default))
  }
}))
