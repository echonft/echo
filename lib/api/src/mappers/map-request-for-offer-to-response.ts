import { RequestForOfferResponse } from '../types'
import { mapActivityToResponse } from './map-activity-to-response'
import { mapDateToNumber } from './map-date-to-number'
import { mapOfferToResponse } from './map-offer-to-response'
import { mapSwapToResponse } from './map-swap-to-response'
import { RequestForOffer } from '@echo/model'

// TODO Use ramda
export function mapRequestForOfferToResponse(requestForOffer: RequestForOffer): RequestForOfferResponse {
  return {
    ...requestForOffer,
    activities: requestForOffer.activities?.map(mapActivityToResponse),
    offers: requestForOffer.offers?.map(mapOfferToResponse),
    swaps: requestForOffer.swaps?.map(mapSwapToResponse),
    createdAt: mapDateToNumber(requestForOffer.createdAt),
    expiresAt: mapDateToNumber(requestForOffer.expiresAt),
    postedAt: mapDateToNumber(requestForOffer.postedAt)
  }
}
