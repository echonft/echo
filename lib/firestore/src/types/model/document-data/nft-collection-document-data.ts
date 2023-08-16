import { ContractDocumentData } from './contract-document-data'
import { DiscordGuildDocumentData } from './discord-guild-document-data'
import { DocumentData, DocumentReference } from 'firebase-admin/firestore'

export interface NftCollectionDocumentData extends DocumentData {
  bannerUrl?: string
  blurUrl?: string
  contract: DocumentReference<ContractDocumentData>
  description: string
  discordGuild: DocumentReference<DiscordGuildDocumentData>
  discordUrl?: string
  floorPrice?: number
  name: string
  openSeaUrl?: string
  profilePictureUrl?: string
  slug: string
  totalSupply?: number
  twitterUsername?: string
  websiteUrl?: string
}
