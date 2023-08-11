import { NewOffer } from '@echo/model'
import { atom } from 'recoil'

export const newOfferState = atom<NewOffer>({
  key: 'newOffer',
  default: undefined
})
