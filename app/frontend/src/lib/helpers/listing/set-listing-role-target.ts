import { LISTING_ROLE_TARGET } from '@echo/model/constants/listing-role'
import type { Listing } from '@echo/model/types/listing'
import type { ListingRole } from '@echo/model/types/listing-role'
import type { ListingWithRole } from '@echo/ui/types/listing-with-role'
import { assoc } from 'ramda'

export function setListingRoleTarget(listing: Listing): ListingWithRole {
  return assoc<ListingRole, Listing, 'role'>('role', LISTING_ROLE_TARGET, listing)
}
