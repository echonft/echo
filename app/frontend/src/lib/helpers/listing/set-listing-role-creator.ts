import { LISTING_ROLE_CREATOR } from '@echo/model/constants/listing-role'
import type { Listing } from '@echo/model/types/listing'
import type { ListingWithRole } from '@echo/ui/types/listing-with-role'
import { assoc } from 'ramda'

export function setListingRoleCreator(listing: Listing): ListingWithRole {
  return assoc('role', LISTING_ROLE_CREATOR, listing)
}
