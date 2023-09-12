import { ListingItem } from './listing-item'
import { ListingState } from './listing-state'
import { ListingTarget } from './listing-target'
import { User } from './user'
import type { NonEmptyArray } from '@echo/utils/types'
import { Dayjs } from 'dayjs'

export interface Listing {
  id: string
  creator: User
  createdAt: Dayjs
  expired: boolean
  expiresAt: Dayjs
  items: NonEmptyArray<ListingItem>
  state: ListingState
  targets: NonEmptyArray<ListingTarget>
}
