import { FirestoreDiscordGuild } from '../discord-guild/firestore-discord-guild'
import { FirestoreNft } from '../nft/firestore-nft'
import { FirestoreUser } from '../user/firestore-user'
import { FirestoreOfferActivity } from './firestore-offer-activity'
import { DocumentData, DocumentReference } from 'firebase/firestore'

export interface FirestoreOffer extends DocumentData {
  activities: FirestoreOfferActivity[]
  createdAt: number
  discordGuild: DocumentReference<FirestoreDiscordGuild>
  expiresAt: number
  postedAt?: number
  receiver: DocumentReference<FirestoreUser>
  receiverItems: DocumentReference<FirestoreNft>[]
  sender: DocumentReference<FirestoreUser>
  senderItems: DocumentReference<FirestoreNft>[]
  state: string
  threadId?: string
}
