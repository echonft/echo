import { FirestoreActivity } from '../activity/firestore-activity'
import { FirestoreDiscordGuild } from '../discord-guild/firestore-discord-guild'
import { FirestoreNft } from '../nft/firestore-nft'
import { FirestoreUser } from '../user/firestore-user'
import { DocumentData, DocumentReference } from '@google-cloud/firestore'

export interface FirestoreOffer extends DocumentData {
  activities: FirestoreActivity[]
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
