import type { Wallet } from '@echo/model/types/wallet'
import type { WithSlug } from '@echo/model/types/with-slug'
import type { DeepPartial } from '@echo/utils/types/deep-partial'
import type { Nullable } from '@echo/utils/types/nullable'

export interface Collection extends WithSlug {
  bannerUrl?: Nullable<string>
  contract: Wallet
  description?: Nullable<string>
  discordUrl?: Nullable<string>
  name: string
  profilePictureUrl?: Nullable<string>
  totalSupply: number
  twitterUsername?: Nullable<string>
  verified: boolean
  websiteUrl?: Nullable<string>
}

export type CollectionIndex = Pick<Collection, 'slug'>
export type PartialCollection = DeepPartial<Collection> & Required<CollectionIndex>
