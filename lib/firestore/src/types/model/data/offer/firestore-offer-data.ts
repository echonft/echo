import { FirestoreRootCollectionDocumentData } from '../abstract/firestore-root-collection-document-data'
import { FirestoreActivityData } from '../activity/firestore-activity-data'
import { FirestoreDiscordGuildData } from '../discord-guild/firestore-discord-guild-data'
import { FirestoreNftData } from '../nft/firestore-nft-data'
import { FirestoreUserData } from '../user/firestore-user-data'
import { FirestoreOfferState } from './firestore-offer-state'

export interface FirestoreOfferData extends FirestoreRootCollectionDocumentData {
  activities: FirestoreActivityData[]
  createdAt: number
  discordGuild: FirestoreDiscordGuildData
  expiresAt: number
  postedAt?: number
  receiver: FirestoreUserData
  receiverItems: FirestoreNftData[]
  sender: FirestoreUserData
  senderItems: FirestoreNftData[]
  state: FirestoreOfferState
  threadId?: string
}
