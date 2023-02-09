import { FirestoreDiscordGuild } from './firestore-discord-guild'
import { FirestoreOfferActivity } from './firestore-offer-activity'
import { FirestoreOfferItem } from './firestore-offer-item'
import { FirestoreUser } from './firestore-user'
import { DocumentData, DocumentReference } from 'firebase/firestore'

export interface FirestoreOffer extends DocumentData {
  state: string
  discordGuild: DocumentReference<FirestoreDiscordGuild>
  threadId?: string
  sender: DocumentReference<FirestoreUser>
  senderItems: Array<FirestoreOfferItem>
  receiver: DocumentReference<FirestoreUser>
  receiverItems: Array<FirestoreOfferItem>
  activities: Array<FirestoreOfferActivity>
  postedAt: number
  expiresAt: number
  createdAt: number
}
