import { OfferState } from '../../types/offer-state'

export const offerDetailsContainerBackgroundImage = (state: OfferState) => {
  switch (state) {
    case OfferState.OPEN:
      return 'bg-offer-yellow-gradient'
    case OfferState.ACCEPTED:
      return 'bg-offer-green-gradient'
    case OfferState.CANCELLED:
      return 'bg-offer-red-gradient'
    case OfferState.COMPLETED:
      return 'bg-offer-green-gradient'
    case OfferState.REJECTED:
      return 'bg-offer-red-gradient'
    case OfferState.EXPIRED:
      return 'bg-offer-red-gradient'
  }
}
