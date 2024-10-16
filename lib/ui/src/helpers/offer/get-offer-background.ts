import {
  OFFER_STATE_ACCEPTED,
  OFFER_STATE_CANCELLED,
  OFFER_STATE_COMPLETED,
  OFFER_STATE_EXPIRED,
  OFFER_STATE_OPEN,
  OFFER_STATE_REJECTED
} from '@echo/model/constants/offer-states'
import type { Offer } from '@echo/model/types/offer/offer'
import { BG_DEFAULT, BG_GREEN_GRADIENT, BG_RED_GRADIENT, BG_YELLOW_GRADIENT } from '@echo/ui/constants/background'
import type { Nullable } from '@echo/utils/types/nullable'
import { isNil } from 'ramda'

export function getOfferBackground(offer: Nullable<Offer>) {
  if (isNil(offer)) {
    return BG_DEFAULT
  }
  switch (offer.state) {
    case OFFER_STATE_OPEN:
    case OFFER_STATE_ACCEPTED:
      return BG_YELLOW_GRADIENT
    case OFFER_STATE_COMPLETED:
      return BG_GREEN_GRADIENT
    case OFFER_STATE_EXPIRED:
    case OFFER_STATE_CANCELLED:
    case OFFER_STATE_REJECTED:
      return BG_RED_GRADIENT
  }
}
