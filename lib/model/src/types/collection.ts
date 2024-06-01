import type { Wallet } from '@echo/model/types/wallet'
import type { WithSlug } from '@echo/model/types/with-slug'
import type { Nullable } from '@echo/utils/types/nullable'

export interface Collection extends WithSlug {
  bannerUrl?: Nullable<string>
  contract: Wallet
  description?: Nullable<string>
  discordUrl?: Nullable<string>
  name: string
  profilePictureUrl?: Nullable<string>
  swapsCount?: number
  totalSupply: number
  twitterUsername?: Nullable<string>
  verified: boolean
  websiteUrl?: Nullable<string>
}
