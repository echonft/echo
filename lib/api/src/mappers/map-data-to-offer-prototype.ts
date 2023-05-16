import { CreateOfferRequest } from '../types/model/requests/create-offer-request'
import { mapItemOfferItemPrototype } from './map-item-offer-item-prototype'
import { FirestoreOfferPrototype } from '@echo/firebase-admin'
import { RequestForOffer, User } from '@echo/model'

export function mapDataToOfferPrototype(
  user: User,
  request: CreateOfferRequest,
  requestForOffer?: RequestForOffer
): FirestoreOfferPrototype {
  // TODO If no request for offer, should receive discord and receiver
  return {
    receiverItems: request.receiverItems.map(mapItemOfferItemPrototype),
    senderItems: request.senderItems.map(mapItemOfferItemPrototype),
    receiverId: requestForOffer?.sender?.id ?? '',
    senderId: user.id,
    discordGuildId: requestForOffer?.discordGuild.discordId ?? ''
  }
}
