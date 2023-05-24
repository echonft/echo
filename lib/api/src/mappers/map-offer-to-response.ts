import { OfferResponse } from '../types/model/responses/offer-response'
import { mapActivityToResponse } from './map-activity-to-response'
import { mapDateToNumber } from './map-date-to-number'
import { Offer } from '@echo/model'

// TODO Use ramda
export function mapOfferToResponse(offer: Offer): OfferResponse {
  return {
    ...offer,
    activities: offer.activities?.map(mapActivityToResponse),
    createdAt: mapDateToNumber(offer.createdAt),
    expiresAt: mapDateToNumber(offer.expiresAt),
    postedAt: mapDateToNumber(offer.postedAt)
  }
}
