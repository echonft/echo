import type { Listing } from '@echo/model/types/listing'
import type { ListingRole } from '@echo/model/types/listing-role'

export interface ListingWithRole extends Listing {
  role: ListingRole | undefined
}
