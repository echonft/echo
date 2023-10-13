import type { ListingItem } from '@echo/ui/types/model/listing-item'
import type { ListingState } from '@echo/ui/types/model/listing-state'
import type { ListingTarget } from '@echo/ui/types/model/listing-target'
import type { User } from '@echo/ui/types/model/user'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'

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
