import { ContractDocumentData } from './contract-document-data'
import { DiscordGuildDocumentData } from './discord-guild-document-data'

export interface NftCollectionDocumentData {
  bannerUrl: string | undefined
  blurUrl: string | undefined
  contract: ContractDocumentData
  description: string
  discordGuild: DiscordGuildDocumentData
  discordUrl: string | undefined
  floorPrice: number | undefined
  name: string
  openSeaUrl: string | undefined
  profilePictureUrl: string | undefined
  slug: string
  totalSupply: number | undefined
  twitterUsername: string | undefined
  websiteUrl: string | undefined
}
