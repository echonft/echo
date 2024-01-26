import { LISTING_ROLE_TARGET } from '@echo/model/constants/listing-role'
import type { ListingWithRole } from '@echo/ui/types/listing-with-role'
import { propEq } from 'ramda'

export function isListingRoleTarget(listing: ListingWithRole) {
  return propEq(LISTING_ROLE_TARGET, 'role', listing)
}
