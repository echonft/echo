import type { WithId } from '@echo/model/types/with-id'
import type { WithSlug } from '@echo/model/types/with-slug'
import type { HexString } from '@echo/utils/types/hex-string'
import type { Nullable } from '@echo/utils/types/nullable'

export interface Contract {
  address: Lowercase<HexString>
  chainId: number
}

export interface Collection extends WithId, WithSlug {
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
