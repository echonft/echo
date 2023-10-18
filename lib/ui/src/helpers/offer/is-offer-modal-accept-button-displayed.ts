import { type OfferState } from '@echo/model/types/offer-state'

export const isOfferModalAcceptButtonDisplayed = (state: OfferState, isReceiving: boolean) => {
  switch (state) {
    case 'OPEN':
      return isReceiving
    case 'ACCEPTED':
      // TODO Add the cases where you have approved or not
      return true
    default:
      return false
  }
}
