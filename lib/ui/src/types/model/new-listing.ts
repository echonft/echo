import type { ListingItem } from '@echo/ui/types/model/listing-item'
import type { ListingTarget } from '@echo/ui/types/model/listing-target'

export interface NewListing {
  items: ListingItem[]
  targets: ListingTarget[]
}
