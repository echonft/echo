import { setListingRoleCreator } from '@echo/frontend/lib/helpers/listing/set-listing-role-creator'
import { setListingRoleTarget } from '@echo/frontend/lib/helpers/listing/set-listing-role-target'
import { setListingRoleUndefined } from '@echo/frontend/lib/helpers/listing/set-listing-role-undefined'
import { getListingTargetsCollectionIds } from '@echo/model/helpers/listing/get-listing-targets-collection-ids'
import type { AuthUser } from '@echo/model/types/auth-user'
import type { Listing } from '@echo/model/types/listing'
import type { Nft } from '@echo/model/types/nft'
import type { ListingWithRole } from '@echo/ui/types/listing-with-role'
import { intersects } from '@echo/utils/fp/intersects'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { isNil, map, path, pipe, uniq } from 'ramda'

export function setListingRoleForUser(user: AuthUser | undefined, nfts: Nft[]) {
  return function (listing: Listing): ListingWithRole {
    if (isNil(user)) {
      return setListingRoleUndefined(listing)
    }
    const { username } = user
    if (listing.creator.username === username) {
      return setListingRoleCreator(listing)
    }
    const listingTargets = getListingTargetsCollectionIds(listing)
    const nftCollections = pipe<[Nft[]], string[], string[]>(
      map(nonNullableReturn(path(['collection', 'id']))),
      uniq
    )(nfts)
    if (intersects(listingTargets, nftCollections)) {
      return setListingRoleTarget(listing)
    }
    return setListingRoleUndefined(listing)
  }
}
