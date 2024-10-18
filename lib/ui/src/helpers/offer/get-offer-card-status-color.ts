import { OfferState } from '@echo/model/constants/offer-state'
import type { Offer } from '@echo/model/types/offer/offer'
import { Color } from '@echo/ui/constants/color'
import type { CardStatusColor } from '@echo/ui/types/card-status-color'

export const getOfferCardStatusColor = (offer: Offer): CardStatusColor => {
  switch (offer.state) {
    case OfferState.Open:
      return Color.Yellow
    case OfferState.Completed:
    case OfferState.Accepted:
      return Color.Green
    case OfferState.Cancelled:
    case OfferState.Rejected:
    case OfferState.Expired:
      return Color.Red
  }
}
