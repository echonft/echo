import type { ListingState } from '@echo/model/constants/listing-state'
import type { Collection } from '@echo/model/types/collection/collection'
import type { NftItem } from '@echo/model/types/item/nft-item'
import { type User } from '@echo/model/types/user/user'
import type { WithSlug } from '@echo/model/types/with-slug'
import type { NonEmptyArray } from 'ramda'

export interface Listing extends WithSlug {
  creator: User
  expiresAt: number
  items: NonEmptyArray<NftItem>
  locked: boolean
  state: ListingState
  target: {
    collection: Collection
    quantity: number
  }
}
