import { ListingRole } from '@echo/model/constants/listing-role'
import type { Listing } from '@echo/model/types/listing/listing'
import type { ListingWithRole } from '@echo/ui/types/listing-with-role'
import { assoc } from 'ramda'

export function setListingRoleCreator(listing: Listing): ListingWithRole {
  return assoc<ListingRole, Listing, 'role'>('role', ListingRole.Creator, listing)
}
