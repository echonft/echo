import { type Contract } from '@echo/model/types/contract'
import type { Nullable } from '@echo/utils/types/nullable'

export interface Collection {
  id: string
  bannerUrl?: Nullable<string>
  blurUrl?: Nullable<Lowercase<string>>
  contract: Contract
  description: string
  discordUrl?: Nullable<string>
  floorPrice?: number
  name: string
  openSeaUrl?: Nullable<Lowercase<string>>
  profilePictureUrl: string
  slug: Lowercase<string>
  swapsCount?: number
  totalSupply: number
  twitterUsername?: string
  verified: boolean
  websiteUrl?: Nullable<string>
}
