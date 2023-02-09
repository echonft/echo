import { FirestoreContract } from './firestore-contract'
import { FirestoreDiscordGuild } from './firestore-discord-guild'
import { FirestoreOffer } from './firestore-offer'
import { FirestoreOfferItem } from './firestore-offer-item'
import { FirestoreRequestForOfferActivity } from './firestore-request-for-offer-activity'
import { FirestoreSwap } from './firestore-swap'
import { FirestoreUser } from './firestore-user'
import { DocumentData, DocumentReference } from 'firebase/firestore'

export interface FirestoreRequestForOffer extends DocumentData {
  status: string
  sender: DocumentReference<FirestoreUser>
  items: Array<FirestoreOfferItem>
  collection: DocumentReference<FirestoreDiscordGuild>
  target: Array<FirestoreContract>
  activities: Array<FirestoreRequestForOfferActivity>
  offers?: Array<FirestoreOffer>
  swaps?: FirestoreSwap[]
  expiresAt: number
  postedAt: number | undefined
  createdAt: number
}
