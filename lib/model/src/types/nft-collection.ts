import { Contract } from './contract'
import { DiscordGuild } from './discord-guild'

export interface NftCollection {
  id: string
  bannerUrl: URL | undefined
  contract: Contract
  description: string
  discordGuild: DiscordGuild
  discordUrl: URL | undefined
  floorPrice: number | undefined
  name: string
  slug: string
  profilePictureUrl: URL | undefined
  totalSupply: number | undefined // This field is only available on ERC-721 contracts
  twitterUsername: string | undefined
  websiteUrl: URL | undefined
}
