// TODO Use T instead of returning a string
import { type OfferState } from '@echo/model/types/offer-state'

export const getOfferModalAcceptButtonTitleForState = (state: OfferState) => {
  switch (state) {
    case 'OPEN':
      return 'acceptBtn'
    case 'ACCEPTED':
      return 'completeBtn'
    default:
      throw Error('unsupported state')
  }
}
