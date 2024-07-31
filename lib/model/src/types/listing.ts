import { type ListingState } from '@echo/model/types/listing-state'
import { type ListingTarget } from '@echo/model/types/listing-target'
import { type OwnedNft } from '@echo/model/types/nft'
import { type User } from '@echo/model/types/user'
import type { WithSlug } from '@echo/model/types/with-slug'
import type { NonEmptyArray } from 'ramda'

export interface Listing extends WithSlug {
  createdAt: number
  creator: User
  expiresAt: number
  items: NonEmptyArray<OwnedNft>
  readOnly: boolean
  state: ListingState
  target: ListingTarget
  updatedAt: number
}
