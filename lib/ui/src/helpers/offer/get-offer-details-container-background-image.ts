import {
  OFFER_STATE_ACCEPTED,
  OFFER_STATE_CANCELLED,
  OFFER_STATE_COMPLETED,
  OFFER_STATE_OPEN,
  OFFER_STATE_REJECTED
} from '@echo/model/constants/offer-states'
import { type OfferState } from '@echo/model/types/offer-state'

export const getOfferDetailsContainerBackgroundImage = (state: OfferState) => {
  switch (state) {
    case OFFER_STATE_OPEN:
      return 'bg-offer-yellow-gradient'
    case OFFER_STATE_COMPLETED:
    case OFFER_STATE_ACCEPTED:
      return 'bg-offer-green-gradient'
    case OFFER_STATE_CANCELLED:
    case OFFER_STATE_REJECTED:
      return 'bg-offer-red-gradient'
  }
}
