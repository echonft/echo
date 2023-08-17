import { NewOffer } from '../types/new-offer'
import { NewOfferState } from '../types/new-offer-state'
import { atom } from 'recoil'

export const newOfferDataState = atom<NewOffer | undefined>({
  key: 'newOfferData',
  default: undefined
})

export const newOfferState = atom<NewOfferState>({
  key: 'newOfferState',
  default: 'NONE'
})
