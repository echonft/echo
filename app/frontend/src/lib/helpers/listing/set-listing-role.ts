import type { User } from '@echo/auth/types/user'
import { getNftsForOwner } from '@echo/firestore/crud/nft/get-nfts-for-owner'
import { setListingRoleForUser } from '@echo/frontend/lib/helpers/listing/set-listing-role-for-user'
import { setListingRoleUndefined } from '@echo/frontend/lib/helpers/listing/set-listing-role-undefined'
import type { Listing } from '@echo/model/types/listing'
import type { ListingWithRole } from '@echo/ui/types/listing-with-role'
import type { Nullable } from '@echo/utils/types/nullable'
import { isNil, map } from 'ramda'

export function setListingRole(user: Nullable<User>) {
  return async function (listings: Listing[]): Promise<ListingWithRole[]> {
    if (isNil(user)) {
      return map(setListingRoleUndefined, listings)
    }
    const nfts = await getNftsForOwner(user.username)
    return map(setListingRoleForUser(user, nfts), listings)
  }
}
