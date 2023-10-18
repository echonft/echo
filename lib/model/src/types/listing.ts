import { type ListingItem } from '@echo/model/types/listing-item'
import { type ListingState } from '@echo/model/types/listing-state'
import { type ListingTarget } from '@echo/model/types/listing-target'
import { type User } from '@echo/model/types/user'
import { type NonEmptyArray } from '@echo/utils/types/non-empty-array'

export interface Listing {
  id: string
  creator: User
  createdAt: number
  expired: boolean
  expiresAt: number
  items: NonEmptyArray<ListingItem>
  state: ListingState
  targets: NonEmptyArray<ListingTarget>
  updatedAt: number
}
