import { OfferState } from '@echo/model/constants/offer-state'
import type { Offer } from '@echo/model/types/offer/offer'
import { BG_DEFAULT, BG_GREEN_GRADIENT, BG_RED_GRADIENT, BG_YELLOW_GRADIENT } from '@echo/ui/constants/background'
import type { Nullable } from '@echo/utils/types/nullable'
import { isNil } from 'ramda'

export function getOfferBackground(offer: Nullable<Offer>) {
  if (isNil(offer)) {
    return BG_DEFAULT
  }
  switch (offer.state) {
    case OfferState.Open:
    case OfferState.Accepted:
      return BG_YELLOW_GRADIENT
    case OfferState.Completed:
      return BG_GREEN_GRADIENT
    case OfferState.Expired:
    case OfferState.Cancelled:
    case OfferState.Rejected:
      return BG_RED_GRADIENT
  }
}
