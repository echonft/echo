import { ListingRole } from '@echo/model/constants/listing-role'
import type { ListingWithRole } from '@echo/ui/types/listing-with-role'
import { propEq } from 'ramda'

export function isListingRoleCreator(listing: ListingWithRole) {
  return propEq(ListingRole.Creator, 'role', listing)
}
