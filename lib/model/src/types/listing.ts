import type { ListingState } from '@echo/model/constants/listing-state'
import type { Collection } from '@echo/model/types/collection'
import type { NftItem } from '@echo/model/types/item'
import type { User } from '@echo/model/types/user'
import type { NonEmptyArray } from 'ramda'

export interface Listing {
  creator: User
  expiresAt: number
  items: NonEmptyArray<NftItem>
  locked: boolean
  slug: Lowercase<string>
  state: ListingState
  target: {
    collection: Collection
    quantity: number
  }
}
