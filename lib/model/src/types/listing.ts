import { type ListingItem } from '@echo/model/types/listing-item'
import { type ListingState } from '@echo/model/types/listing-state'
import { type ListingTarget } from '@echo/model/types/listing-target'
import { type User } from '@echo/model/types/user'
import type { WithId } from '@echo/model/types/with-id'

export interface Listing extends WithId {
  createdAt: number
  creator: User
  expiresAt: number
  items: ListingItem[]
  readOnly: boolean
  state: ListingState
  targets: ListingTarget[]
  updatedAt: number
}
