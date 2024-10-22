import { OfferState } from '@echo/model/constants/offer-state'
import { Color } from '@echo/ui/constants/color'
import type { CardStatusColor } from '@echo/ui/types/card-status-color'

export const getOfferCardStatusColor = (state: OfferState): CardStatusColor => {
  switch (state) {
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
