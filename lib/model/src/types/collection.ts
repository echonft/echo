import { TokenType } from '@echo/model/constants/token-type'
import type { Contract } from '@echo/model/types/contract'
import type { Slug } from '@echo/model/types/slug'
import type { Nullable } from '@echo/utils/types/nullable'

export interface Collection {
  contract: Contract
  description: Nullable<string>
  discordUrl: Nullable<string>
  name: string
  profilePictureUrl: Nullable<string>
  slug: Slug
  totalSupply: number
  twitterUsername: Nullable<string>
  type: TokenType.Erc721 | TokenType.Erc1155
  verified: boolean
  websiteUrl: Nullable<string>
}

export type CollectionIndex = Pick<Collection, 'slug'>
export type CollectionContract = Pick<Collection, 'contract'>
