import type { Collection } from '@echo/model/types/collection/collection'
import type { Erc1155Item } from '@echo/model/types/item/erc1155-item'
import type { Erc721Item } from '@echo/model/types/item/erc721-item'
import { type ListingState } from '@echo/model/types/listing/listing-state'
import { type User } from '@echo/model/types/user/user'
import type { WithSlug } from '@echo/model/types/with-slug'
import type { NonEmptyArray } from 'ramda'

export interface Listing extends WithSlug {
  creator: User
  expiresAt: number
  items: NonEmptyArray<Erc721Item | Erc1155Item>
  readOnly: boolean
  state: ListingState
  target: {
    collection: Collection
    quantity: number
  }
}
