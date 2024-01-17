import type { Banner } from '@echo/ui/types/banner'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import { assoc } from 'ramda'
import { create } from 'zustand'

interface BannerStore {
  banner: Banner | undefined
  show: (banner: Banner) => unknown
  dismiss: EmptyFunction
}

export const useBannerStore = create<BannerStore>((set) => ({
  banner: undefined,
  show: (banner) => {
    set(assoc('banner', banner))
  },
  dismiss: () => {
    set(assoc('banner', undefined))
  }
}))
