import { FirestoreDiscordGuild } from '../discord-guild/firestore-discord-guild'
import { FirestoreUser } from '../user/firestore-user'
import { FirestoreOfferItem } from './nested-documents/firestore-offer-item'
import { FirestoreOfferActivity } from './subcollections/offer-activity/firestore-offer-activity'
import { CollectionReference, DocumentData, DocumentReference } from 'firebase/firestore'

export interface FirestoreOffer extends DocumentData {
  state: string
  discordGuild: DocumentReference<FirestoreDiscordGuild>
  threadId?: string
  sender: DocumentReference<FirestoreUser>
  senderItems: Array<FirestoreOfferItem>
  receiver: DocumentReference<FirestoreUser>
  receiverItems: Array<FirestoreOfferItem>
  activities: CollectionReference<FirestoreOfferActivity>
  postedAt?: number
  expiresAt: number
  createdAt: number
}
