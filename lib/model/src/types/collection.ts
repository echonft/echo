import type { Wallet } from '@echo/model/types/wallet'
import type { WithSlug } from '@echo/model/types/with-slug'
import type { DeepPartial } from '@echo/utils/types/deep-partial'
import type { Nullable } from '@echo/utils/types/nullable'
import type { OptionalRecord } from '@echo/utils/types/optional-record'
import { pick } from 'ramda'

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

export function serializeCollection<T extends DeepPartial<Collection & OptionalRecord<'id', string>>>(
  collection: T
): T {
  return pick(['id', 'contract', 'slug'], collection) as T
}
