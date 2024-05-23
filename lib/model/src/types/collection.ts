import type { WithSlug } from '@echo/model/types/with-slug'
import type { ChainName } from '@echo/utils/types/chain-name'
import type { HexString } from '@echo/utils/types/hex-string'
import type { Nullable } from '@echo/utils/types/nullable'

export interface Contract {
  address: Lowercase<HexString>
  chain: ChainName
}

export interface Collection extends WithSlug {
  bannerUrl?: Nullable<string>
  contracts: Contract[]
  description?: Nullable<string>
  discordUrl?: Nullable<string>
  name: string
  profilePictureUrl?: Nullable<string>
  slug: Lowercase<string>
  swapsCount?: number
  totalSupply: number
  twitterUsername?: Nullable<string>
  verified: boolean
  websiteUrl?: Nullable<string>
}
