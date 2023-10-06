// TODO Use T instead of returning a string
import type { OfferState } from '@echo/ui/types/model/offer-state'

export const getOfferModalAcceptButtonTitleForState = (state: OfferState) => {
  switch (state) {
    case 'OPEN':
      return 'acceptBtn'
    case 'ACCEPTED':
      return 'approveBtn'
    default:
      throw Error('unsupported state')
    // TODO Add the other cases
  }
}
