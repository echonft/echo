import type { AuthUser } from '@echo/model/types/auth-user'
import type { Listing } from '@echo/model/types/listing'
import { setListingRoleCreator } from '@echo/ui/helpers/listing/set-listing-role-creator'
import { setListingRoleTarget } from '@echo/ui/helpers/listing/set-listing-role-target'
import { setListingRoleUndefined } from '@echo/ui/helpers/listing/set-listing-role-undefined'
import type { ListingWithRole } from '@echo/ui/types/listing-with-role'
import { isNil } from 'ramda'

export function setListingRoleForUser(user: AuthUser | undefined) {
  return function (listing: Listing): ListingWithRole {
    if (isNil(user)) {
      return setListingRoleUndefined(listing)
    }
    const { username } = user
    if (listing.creator.username === username) {
      return setListingRoleCreator(listing)
    }
    return setListingRoleTarget(listing)
  }
}
