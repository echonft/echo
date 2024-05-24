import { type ListingState } from '@echo/model/types/listing-state'
import { type ListingTarget } from '@echo/model/types/listing-target'
import type { Nft } from '@echo/model/types/nft'
import { type User } from '@echo/model/types/user'
import type { WithSlug } from '@echo/model/types/with-slug'

export interface Listing extends WithSlug {
  createdAt: number
  creator: User
  expiresAt: number
  items: Nft[]
  readOnly: boolean
  state: ListingState
  target: ListingTarget
  updatedAt: number
}
