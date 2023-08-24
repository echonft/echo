import { ListingState } from './listing-state'
import { ListingTarget } from './listing-target'
import { Offer } from './offer'
import { OfferItem } from './offer-item'
import { Swap } from './swap'
import { User } from './user'
import { NonEmptyArray } from '@echo/utils'
import { Dayjs } from 'dayjs'

export interface Listing {
  id: string
  creator: User
  expired: boolean
  expiresAt: Dayjs
  items: NonEmptyArray<OfferItem>
  offers: Offer[]
  state: ListingState
  swaps: Swap[]
  targets: NonEmptyArray<ListingTarget>
}
