import {
  OFFER_STATE_ACCEPTED,
  OFFER_STATE_CANCELLED,
  OFFER_STATE_COMPLETED,
  OFFER_STATE_OPEN,
  OFFER_STATE_REJECTED
} from '@echo/model/constants/offer-states'
import { type OfferState } from '@echo/model/types/offer-state'

export const getOfferStateBackgroundColor = (state: OfferState, expired?: boolean) => {
  if (expired) {
    return 'bg-red-400'
  }
  switch (state) {
    case OFFER_STATE_OPEN:
      return 'bg-yellow-500'
    case OFFER_STATE_COMPLETED:
    case OFFER_STATE_ACCEPTED:
      return 'bg-green-500'
    case OFFER_STATE_CANCELLED:
    case OFFER_STATE_REJECTED:
      return 'bg-red-400'
  }
}
