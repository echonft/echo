import { type OfferState } from '@echo/model/types/offer-state'

export const getOfferDetailsContainerBackgroundImage = (state: OfferState) => {
  switch (state) {
    case 'OPEN':
      return 'bg-offer-yellow-gradient'
    case 'COMPLETED':
    case 'ACCEPTED':
      return 'bg-offer-green-gradient'
    case 'CANCELLED':
    case 'REJECTED':
      return 'bg-offer-red-gradient'
  }
}
