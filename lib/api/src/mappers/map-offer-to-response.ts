import { OfferResponse } from '../types/model/responses/offer-response'
import { mapOfferActivityToResponse } from './map-offer-activity-to-response'
import { Offer } from '@echo/model'

// TODO Use ramda
export function mapOfferToResponse(offer: Offer): OfferResponse {
  return {
    ...offer,
    activities: offer.activities?.map(mapOfferActivityToResponse),
    createdAt: offer.createdAt.unix(),
    expiresAt: offer.expiresAt.unix(),
    postedAt: offer.postedAt?.unix(),
    senderItems: offer.senderItems,
    receiverItems: offer.receiverItems
  }
}
