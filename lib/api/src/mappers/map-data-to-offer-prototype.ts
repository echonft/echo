import { ItemRequest } from '../types'
import { mapItemOfferItemPrototype } from './map-item-offer-item-prototype'
import { FirestoreOfferPrototype } from '@echo/firebase-admin'

export function mapDataToOfferPrototype(
  senderId: string,
  senderItems: ItemRequest[],
  receiverId: string,
  receiverItems: ItemRequest[],
  discordGuildId: string
): FirestoreOfferPrototype {
  return {
    senderId,
    senderItems: senderItems.map(mapItemOfferItemPrototype),
    receiverId,
    receiverItems: receiverItems.map(mapItemOfferItemPrototype),
    discordGuildId
  }
}
