import { AlchemyContract } from './alchemy-contract'

export interface AlchemyNftCollection {
  contract: AlchemyContract
  description: string
  discordUrl: string | undefined
  floorPrice: number | undefined
  name: string
  profilePictureUrl: string | undefined
  totalSupply: number | undefined
  twitterUsername: string | undefined
  websiteUrl: string | undefined
}
