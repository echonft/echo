import type { ListingState } from '@echo/model/constants/listing-state'
import type { Collection } from '@echo/model/types/collection'
import type { NftItem } from '@echo/model/types/item'
import type { Slug } from '@echo/model/types/slug'
import type { User } from '@echo/model/types/user'
import type { NonEmptyArray } from 'ramda'

export interface Listing {
  creator: User & Required<Pick<User, 'wallet'>>
  expiresAt: number
  items: NonEmptyArray<NftItem>
  locked: boolean
  slug: Slug
  state: ListingState
  target: {
    collection: Collection
    quantity: number
  }
}
