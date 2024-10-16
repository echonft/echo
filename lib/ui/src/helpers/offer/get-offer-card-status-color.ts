import {
  OFFER_STATE_ACCEPTED,
  OFFER_STATE_CANCELLED,
  OFFER_STATE_COMPLETED,
  OFFER_STATE_EXPIRED,
  OFFER_STATE_OPEN,
  OFFER_STATE_REJECTED
} from '@echo/model/constants/offer-states'
import type { Offer } from '@echo/model/types/offer/offer'
import { COLOR_GREEN, COLOR_RED, COLOR_YELLOW } from '@echo/ui/constants/color'
import type { CardStatusColor } from '@echo/ui/types/card-status-color'

export const getOfferCardStatusColor = (offer: Offer): CardStatusColor => {
  switch (offer.state) {
    case OFFER_STATE_OPEN:
      return COLOR_YELLOW
    case OFFER_STATE_COMPLETED:
    case OFFER_STATE_ACCEPTED:
      return COLOR_GREEN
    case OFFER_STATE_CANCELLED:
    case OFFER_STATE_REJECTED:
    case OFFER_STATE_EXPIRED:
      return COLOR_RED
  }
}
