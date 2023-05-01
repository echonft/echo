import { OfferResponse } from '../types/model/responses/offer-response'
import { mapOfferItemToResponse } from './map-offer-item-to-response'
import { Offer } from '@echo/model'

export function mapOfferToResponse(offer: Offer): OfferResponse {
  return {
    ...offer,
    createdAt: offer.createdAt.unix(),
    expiresAt: offer.expiresAt.unix(),
    postedAt: offer.postedAt?.unix(),
    senderItems: offer.senderItems.map(mapOfferItemToResponse),
    receiverItems: offer.receiverItems.map(mapOfferItemToResponse)
  }
}
