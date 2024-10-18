import { OfferState } from '@echo/model/constants/offer-state'
import type { Offer } from '@echo/model/types/offer/offer'
import { COLOR_GREEN, COLOR_RED, COLOR_YELLOW } from '@echo/ui/constants/color'
import type { CardStatusColor } from '@echo/ui/types/card-status-color'

export const getOfferCardStatusColor = (offer: Offer): CardStatusColor => {
  switch (offer.state) {
    case OfferState.Open:
      return COLOR_YELLOW
    case OfferState.Completed:
    case OfferState.Accepted:
      return COLOR_GREEN
    case OfferState.Cancelled:
    case OfferState.Rejected:
    case OfferState.Expired:
      return COLOR_RED
  }
}
