import type { ListingItem } from '@echo/ui/types/model/listing-item'
import type { ListingState } from '@echo/ui/types/model/listing-state'
import type { ListingTarget } from '@echo/ui/types/model/listing-target'
import type { UserDetails } from '@echo/ui/types/model/user-details'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import type { Dayjs } from 'dayjs'

export interface Listing {
  id: string
  creator: UserDetails
  createdAt: Dayjs
  expired: boolean
  expiresAt: Dayjs
  items: NonEmptyArray<ListingItem>
  state: ListingState
  targets: NonEmptyArray<ListingTarget>
  updatedAt: Dayjs
}
