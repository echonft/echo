import { NewOffer } from '../types/new-offer'
import { atom } from 'recoil'

export const newOfferState = atom<NewOffer>({
  key: 'newOffer',
  default: undefined
})
