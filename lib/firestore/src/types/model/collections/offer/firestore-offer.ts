import { FirestoreDiscordGuild } from '../discord-guild/firestore-discord-guild'
import { FirestoreUser } from '../user/firestore-user'
import { FirestoreOfferActivity } from './firestore-offer-activity'
import { FirestoreOfferItem } from './firestore-offer-item'
import { DocumentData, DocumentReference } from 'firebase/firestore'

export interface FirestoreOffer extends DocumentData {
  state: string
  discordGuild: DocumentReference<FirestoreDiscordGuild>
  threadId?: string
  sender: DocumentReference<FirestoreUser>
  senderItems: FirestoreOfferItem[]
  receiver: DocumentReference<FirestoreUser>
  receiverItems: FirestoreOfferItem[]
  activities: FirestoreOfferActivity[]
  postedAt?: number
  expiresAt: number
  createdAt: number
}
