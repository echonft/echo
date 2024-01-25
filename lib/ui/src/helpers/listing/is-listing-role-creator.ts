import { LISTING_ROLE_CREATOR } from '@echo/model/constants/listing-role'
import type { ListingWithRole } from '@echo/ui/types/listing-with-role'
import { propEq } from 'ramda'

export function isListingRoleCreator(listing: ListingWithRole) {
  return propEq(LISTING_ROLE_CREATOR, 'role', listing)
}
