import { Id } from './id'
import { ListingItem } from './listing-item'
import { ListingState } from './listing-state'
import { ListingTarget } from './listing-target'
import { UserDetails } from './user-details'
import type { NonEmptyArray } from '@echo/utils/types'
import { Dayjs } from 'dayjs'

export interface Listing {
  id: string
  createdAt: Dayjs
  creator: Partial<UserDetails> & Id
  expired: boolean
  expiresAt: Dayjs
  items: NonEmptyArray<ListingItem>
  offersIds: string[]
  state: ListingState
  targets: NonEmptyArray<ListingTarget>
}
