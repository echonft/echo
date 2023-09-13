import type { NewOffer } from '@echo/ui/types/model/new-offer'
import { atom } from 'recoil'

// New Offer
export const newOfferDataState = atom<NewOffer | undefined>({
  key: 'newOfferData',
  default: undefined
})

export const newOfferState = atom<'NONE' | 'TO CONFIRM' | 'CONFIRMED'>({
  key: 'newOfferState',
  default: 'NONE'
})
