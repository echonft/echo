import type { ListingState } from '@echo/model/constants/listing-state'
import type { Collection } from '@echo/model/types/collection'
import type { NftOwner } from '@echo/model/types/nft'
import type { NftItem } from '@echo/model/types/nft-item'
import type { Slug } from '@echo/model/types/slug'
import type { NonEmptyArray } from 'ramda'

export interface Listing {
  creator: NftOwner
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
