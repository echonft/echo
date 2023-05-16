import { FirestoreRequestForOfferPrototype } from '@echo/firebase-admin'
import { User } from '@echo/model'
import { CreateRequestForOfferRequest } from '../types/model/requests/create-request-for-offer-request'
import { mapItemOfferItemPrototype } from './map-item-offer-item-prototype'

export function mapDataToRequestForOfferPrototype(
  user: User,
  request: CreateRequestForOfferRequest
): FirestoreRequestForOfferPrototype {
  return {
    discordGuildId: request.discordGuildId,
    senderId: user.id,
    target: request.target,
    items: request.items.map(mapItemOfferItemPrototype)
  }
}
