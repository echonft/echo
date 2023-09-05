import { Contract } from './contract'
import { NftCollectionDiscordGuild } from './nft-collection-discord-guild'

export interface NftCollection {
  id: string
  bannerUrl?: URL
  blurUrl?: URL
  contract: Contract
  description: string
  discordGuild: NftCollectionDiscordGuild
  discordUrl?: URL
  floorPrice?: number
  name: string
  openSeaUrl?: URL
  profilePictureUrl?: URL
  slug: string
  totalSupply?: number
  twitterUsername?: string
  websiteUrl?: URL
}
