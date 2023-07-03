import { FirestorePrototypeData } from '../base/firestore-prototype-data'

export interface FirestoreOfferPrototype extends FirestorePrototypeData {
  discordGuildId: string
  senderId: string
  senderItems: string[]
  receiverId: string
  receiverItems: string[]
}
