import type { User } from '@echo/auth/types/user'
import { setListingRoleCreator } from '@echo/frontend/lib/helpers/listing/set-listing-role-creator'
import { setListingRoleTarget } from '@echo/frontend/lib/helpers/listing/set-listing-role-target'
import { setListingRoleUndefined } from '@echo/frontend/lib/helpers/listing/set-listing-role-undefined'
import { getNftsCollectionSlugs } from '@echo/model/helpers/nft/get-nfts-collection-slugs'
import type { Listing } from '@echo/model/types/listing'
import type { Nft } from '@echo/model/types/nft'
import type { ListingWithRole } from '@echo/ui/types/listing-with-role'
import type { Nullable } from '@echo/utils/types/nullable'
import { any, equals, isNil, pipe } from 'ramda'

export function setListingRoleForUser(user: Nullable<User>, nfts: Nft[]) {
  return function (listing: Listing): ListingWithRole {
    if (isNil(user)) {
      return setListingRoleUndefined(listing)
    }
    const { username } = user
    if (listing.creator.username === username) {
      return setListingRoleCreator(listing)
    }
    if (pipe<[Nft[]], string[], boolean>(getNftsCollectionSlugs, any(equals(listing.target.collection.slug)))(nfts)) {
      return setListingRoleTarget(listing)
    }
    return setListingRoleUndefined(listing)
  }
}
