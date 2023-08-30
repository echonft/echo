import { ListingItem } from './listing-item'
import { ListingTarget } from './listing-target'

export interface NewListing {
  items: ListingItem[]
  targets: ListingTarget[]
}
