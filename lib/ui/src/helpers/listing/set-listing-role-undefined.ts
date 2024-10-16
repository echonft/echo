import type { Listing } from '@echo/model/types/listing/listing'
import type { ListingWithRole } from '@echo/ui/types/listing-with-role'
import { assoc } from 'ramda'

export function setListingRoleUndefined(listing: Listing): ListingWithRole {
  return assoc('role', undefined, listing)
}
