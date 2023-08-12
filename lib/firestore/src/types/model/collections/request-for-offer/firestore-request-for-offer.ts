import { FirestoreActivity } from '../activity/firestore-activity'
import { FirestoreContract } from '../contract/firestore-contract'
import { FirestoreDiscordGuild } from '../discord-guild/firestore-discord-guild'
import { FirestoreNft } from '../nft/firestore-nft'
import { FirestoreOffer } from '../offer/firestore-offer'
import { FirestoreSwap } from '../swap/firestore-swap'
import { FirestoreUser } from '../user/firestore-user'
import { DocumentData, DocumentReference } from '@google-cloud/firestore'

export interface FirestoreRequestForOffer extends DocumentData {
  activities: FirestoreActivity[]
  createdAt: number
  discordGuild: DocumentReference<FirestoreDiscordGuild>
  expiresAt: number
  items: DocumentReference<FirestoreNft>[]
  offers?: DocumentReference<FirestoreOffer>[]
  postedAt?: number
  sender: DocumentReference<FirestoreUser>
  state: string
  swaps?: DocumentReference<FirestoreSwap>[]
  target: DocumentReference<FirestoreContract>[]
}
