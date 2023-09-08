import { NewOffer } from '@echo/ui-model'
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
