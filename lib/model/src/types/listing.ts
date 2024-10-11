import type { Items } from '@echo/model/types/item'
import { type ListingState } from '@echo/model/types/listing-state'
import { type ListingTarget } from '@echo/model/types/listing-target'
import { type User } from '@echo/model/types/user'
import type { WithSlug } from '@echo/model/types/with-slug'

export interface Listing extends WithSlug {
  creator: User
  expiresAt: number
  items: Items
  readOnly: boolean
  state: ListingState
  target: ListingTarget
}
