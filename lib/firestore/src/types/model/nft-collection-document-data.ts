import type { ContractDocumentData } from '@echo/firestore/types/model/contract-document-data'
import type { NftCollectionDiscordGuildDocumentData } from '@echo/firestore/types/model/nft-collection-discord-guild-document-data'

export interface NftCollectionDocumentData {
  id: string
  bannerUrl?: string
  blurUrl?: string
  contract: ContractDocumentData
  description: string
  discordGuild: NftCollectionDiscordGuildDocumentData
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

export const nftCollectionFields = [
  'id',
  'bannerUrl',
  'contract.address',
  'contract.chainId',
  'contract.name',
  'contract.symbol',
  'contract.tokenType',
  'description',
  'discordGuild.channelId',
  'discordGuild.discordId',
  'floorPrice',
  'name',
  'openSeaUrl',
  'profilePictureUrl',
  'totalSupply',
  'twitterUsername',
  'websiteUrl'
]
