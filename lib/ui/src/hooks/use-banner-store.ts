import type { Banner } from '@echo/ui/types/banner'
import type { Nullable } from '@echo/utils/types/nullable'
import { assoc } from 'ramda'
import { create } from 'zustand'

interface BannerStore {
  banner: Nullable<Banner>
  show: (banner: Banner) => unknown
  dismiss: VoidFunction
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
