import { FirestoreContract } from '../contract/firestore-contract'
import { FirestoreDiscordGuild } from '../discord-guild/firestore-discord-guild'
import { FirestoreOffer } from '../offer/firestore-offer'
import { FirestoreSwap } from '../swap'
import { FirestoreUser } from '../user/firestore-user'
import { FirestoreRequestForOfferActivity } from './firestore-request-for-offer-activity'
import { FirestoreRequestForOfferItem } from './firestore-request-for-offer-item'
import { DocumentData, DocumentReference } from 'firebase/firestore'

export interface FirestoreRequestForOffer extends DocumentData {
  state: string
  sender: DocumentReference<FirestoreUser>
  items: FirestoreRequestForOfferItem[]
  discordGuild: DocumentReference<FirestoreDiscordGuild>
  target: DocumentReference<FirestoreContract>[]
  activities: FirestoreRequestForOfferActivity[]
  offers?: DocumentReference<FirestoreOffer>[]
  swaps?: DocumentReference<FirestoreSwap>[]
  expiresAt: number
  postedAt?: number
  createdAt: number
}
