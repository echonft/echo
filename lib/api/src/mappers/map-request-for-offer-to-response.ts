import { CreateRequestForOfferResponse } from '../types'
import { mapOfferActivityToResponse } from './map-offer-activity-to-response'
import { mapOfferItemToResponse } from './map-offer-item-to-response'
import { mapOfferToResponse } from './map-offer-to-response'
import { mapSwapToResponse } from './map-swap-to-response'
import { RequestForOffer } from '@echo/model'

export function mapRequestForOfferToResponse(requestForOffer: RequestForOffer): CreateRequestForOfferResponse {
  return {
    ...requestForOffer,
    activities: requestForOffer.activities?.map(mapOfferActivityToResponse),
    items: requestForOffer.items.map(mapOfferItemToResponse),
    offers: requestForOffer.offers?.map(mapOfferToResponse),
    swaps: requestForOffer.swaps?.map(mapSwapToResponse),
    expiresAt: requestForOffer.expiresAt.unix(),
    postedAt: requestForOffer.postedAt?.unix(),
    createdAt: requestForOffer.createdAt.unix()
  }
}
