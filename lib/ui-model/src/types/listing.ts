import { ListingItem } from './listing-item'
import { ListingTarget } from './listing-target'
import { User } from './user'
import { NonEmptyArray } from '@echo/utils'
import { Dayjs } from 'dayjs'

export interface Listing {
  id: string
  creator: User
  expired: boolean
  expiresAt: Dayjs
  items: NonEmptyArray<ListingItem>
  offersIds: string[]
  targets: NonEmptyArray<ListingTarget>
}
