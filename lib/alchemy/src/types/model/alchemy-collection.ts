import { type AlchemyContract } from '@echo/alchemy/types/model/alchemy-contract'
import type { Nullable } from '@echo/utils/types/nullable'

export interface AlchemyCollection {
  contract: AlchemyContract
  description: string
  discordUrl: Nullable<string>
  floorPrice: Nullable<number>
  name: string
  profilePictureUrl: Nullable<string>
  totalSupply: Nullable<number>
  twitterUsername: Nullable<string>
  websiteUrl: Nullable<string>
}
