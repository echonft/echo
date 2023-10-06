// TODO Update function with the new offer state with swap
// TODO Use T instead of returning a string
import type { OfferState } from '@echo/ui/types/model/offer-state'

export const getOfferModalDeclineButtonTitleForState = (state: OfferState, isReceiving: boolean) => {
  switch (state) {
    case 'OPEN':
      return isReceiving ? 'rejectBtn' : 'cancelBtn'
    case 'ACCEPTED':
      return 'cancelBtn'
    default:
      throw Error('unsupported state')
  }
}
