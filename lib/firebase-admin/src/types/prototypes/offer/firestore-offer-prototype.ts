import { FirestorePrototypeData } from '../base/firestore-prototype-data'
import { FirestoreOfferItemPrototype } from '../offer-item/firestore-offer-item-prototype'

export interface FirestoreOfferPrototype extends FirestorePrototypeData {
  discordGuildId: string
  senderId: string
  senderItems: FirestoreOfferItemPrototype[]
  receiverId: string
  receiverItems: FirestoreOfferItemPrototype[]
}
