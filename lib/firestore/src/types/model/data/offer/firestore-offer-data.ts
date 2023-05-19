import { FirestoreRootCollectionDocumentData } from '../abstract/firestore-root-collection-document-data'
import { FirestoreDiscordGuildData } from '../discord-guild/firestore-discord-guild-data'
import { FirestoreNftData } from '../nft/firestore-nft-data'
import { FirestoreUserData } from '../user/firestore-user-data'
import { FirestoreOfferActivityData } from './firestore-offer-activity-data'

export interface FirestoreOfferData extends FirestoreRootCollectionDocumentData {
  activities: FirestoreOfferActivityData[]
  createdAt: number
  discordGuild: FirestoreDiscordGuildData
  expiresAt: number
  postedAt?: number
  receiver: FirestoreUserData
  receiverItems: FirestoreNftData[]
  sender: FirestoreUserData
  senderItems: FirestoreNftData[]
  state: string
  threadId?: string
}
