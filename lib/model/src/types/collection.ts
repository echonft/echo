import { TokenType } from '@echo/model/constants/token-type'
import type { Address } from '@echo/model/types/address'
import type { Counts } from '@echo/model/types/counts'
import type { Slug } from '@echo/model/types/slug'

export interface Collection {
  contract: Address
  description?: string
  discordUrl?: string
  name: string
  pictureUrl?: string
  slug: Slug
  totalSupply: number
  twitterUsername?: string
  type: TokenType.Erc721 | TokenType.Erc1155
  verified: boolean
  websiteUrl?: string
}

export type CollectionIndex = Pick<Collection, 'slug'>
export type CollectionContract = Pick<Collection, 'contract'>
export type CollectionWithCounts = Collection & Counts

export interface CollectionWithSwapsCount extends Collection {
  readonly swapsCount: number
}
