import { OfferState } from '@echo/model/constants/offer-state'
import type { Offer } from '@echo/model/types/offer/offer'
import { Background } from '@echo/ui/constants/background'
import type { Nullable } from '@echo/utils/types/nullable'
import { isNil } from 'ramda'

export function getOfferBackground(offer: Nullable<Offer>) {
  if (isNil(offer)) {
    return Background.Default
  }
  switch (offer.state) {
    case OfferState.Open:
    case OfferState.Accepted:
      return Background.YellowGradient
    case OfferState.Completed:
      return Background.GreenGradient
    case OfferState.Expired:
    case OfferState.Cancelled:
    case OfferState.Rejected:
      return Background.RedGradient
  }
}
