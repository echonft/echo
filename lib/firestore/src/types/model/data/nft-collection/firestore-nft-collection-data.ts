import { FirestoreRootCollectionDocumentData } from '../abstract/firestore-root-collection-document-data'
import { FirestoreContractData } from '../contract/firestore-contract-data'
import { FirestoreDiscordGuildData } from '../discord-guild/firestore-discord-guild-data'

export interface FirestoreNftCollectionData extends FirestoreRootCollectionDocumentData {
  bannerUrl?: string
  contract: FirestoreContractData
  description: string
  discordGuild: FirestoreDiscordGuildData
  discordUrl?: string
  floorPrice?: number
  name: string
  profilePictureUrl?: string
  totalSupply?: number
  twitterUsername?: string
  websiteUrl?: string
}
