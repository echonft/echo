import { OfferState } from '../../types/offer-state'

export const offerStateBackgroundColor = (state: OfferState) => {
  switch (state) {
    case OfferState.OPEN:
      return 'bg-yellow-500'
    case OfferState.ACCEPTED:
      return 'bg-green-500'
    case OfferState.CANCELLED:
      return 'bg-red-400'
    case OfferState.COMPLETED:
      return 'bg-green-500'
    case OfferState.REJECTED:
      return 'bg-red-400'
    case OfferState.EXPIRED:
      return 'bg-red-400'
  }
}
