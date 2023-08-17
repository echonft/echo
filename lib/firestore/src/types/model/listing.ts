import { Activity } from './activity'
import { ListingState } from './listing-state'
import { ListingTarget } from './listing-target'
import { Offer } from './offer'
import { OfferItem } from './offer-item'
import { Swap } from './swap'
import { UserDetails } from './user-details'
import { Dayjs } from 'dayjs'

export interface Listing {
  id: string
  activities: Activity[]
  createdAt: Dayjs
  creator: UserDetails
  expiresAt: Dayjs
  items: OfferItem[]
  offers: Offer[]
  postedAt: Dayjs | undefined
  state: ListingState
  swaps: Swap[]
  targets: ListingTarget[]
}
