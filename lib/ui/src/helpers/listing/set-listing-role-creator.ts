import { LISTING_ROLE_CREATOR } from '@echo/model/constants/listing-role'
import type { Listing } from '@echo/model/types/listing/listing'
import type { ListingRole } from '@echo/model/types/listing/listing-role'
import type { ListingWithRole } from '@echo/ui/types/listing-with-role'
import { assoc } from 'ramda'

export function setListingRoleCreator(listing: Listing): ListingWithRole {
  return assoc<ListingRole, Listing, 'role'>('role', LISTING_ROLE_CREATOR, listing)
}
