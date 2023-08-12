import { FirestoreRootCollectionDocumentData } from '../abstract/firestore-root-collection-document-data'
import { FirestoreActivityData } from '../activity/firestore-activity-data'
import { FirestoreContractData } from '../contract/firestore-contract-data'
import { FirestoreDiscordGuildData } from '../discord-guild/firestore-discord-guild-data'
import { FirestoreNftData } from '../nft/firestore-nft-data'
import { FirestoreOfferData } from '../offer/firestore-offer-data'
import { FirestoreSwapData } from '../swap/firestore-swap-data'
import { FirestoreUserData } from '../user/firestore-user-data'
import { FirestoreRequestForOfferState } from './firestore-request-for-offer-state'

export interface FirestoreRequestForOfferData extends FirestoreRootCollectionDocumentData {
  sender: FirestoreUserData
  items: FirestoreNftData[]
  discordGuild: FirestoreDiscordGuildData
  target: FirestoreContractData[]
  activities: FirestoreActivityData[]
  offers?: FirestoreOfferData[]
  swaps?: FirestoreSwapData[]
  createdAt: number
  expiresAt: number
  postedAt?: number
  state: FirestoreRequestForOfferState
}
