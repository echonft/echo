import { FirestorePrototypeData } from '../base/firestore-prototype-data'
import { OfferItem, User } from '@echo/model'

export interface FirestoreOfferPrototype extends FirestorePrototypeData {
  discordGuildId: string
  senderId: string
  senderItems: OfferItem[]
  receiverId: User
  receiverItems: OfferItem[]
}
