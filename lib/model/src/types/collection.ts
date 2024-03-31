import { type Contract } from '@echo/model/types/contract'
import type { WithId } from '@echo/model/types/with-id'
import type { WithSlug } from '@echo/model/types/with-slug'
import type { Nullable } from '@echo/utils/types/nullable'

export interface Collection extends WithId, WithSlug {
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
