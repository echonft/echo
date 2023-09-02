import { Contract } from './contract'
import { NftCollectionDiscordGuild } from './nft-collection-discord-guild'

export interface NftCollection {
  id: string
  bannerUrl: URL | undefined
  blurUrl: URL | undefined
  contract: Contract
  description: string
  discordGuild: NftCollectionDiscordGuild
  discordUrl: URL | undefined
  floorPrice: number | undefined
  name: string
  openSeaUrl: URL | undefined
  profilePictureUrl: URL | undefined
  slug: string
  totalSupply: number | undefined
  twitterUsername: string | undefined
  websiteUrl: URL | undefined
}
