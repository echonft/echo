import { type OfferState } from '@echo/model/types/offer-state'

export const isOfferModalAcceptButtonDisplayed = (state: OfferState, isReceiving: boolean) => {
  switch (state) {
    case 'OPEN':
      return isReceiving
    case 'ACCEPTED':
      return !isReceiving
    default:
      return false
  }
}
