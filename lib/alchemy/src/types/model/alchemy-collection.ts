import { AlchemyContract } from '@echo/alchemy/types/model/alchemy-contract'

export interface AlchemyCollection {
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
