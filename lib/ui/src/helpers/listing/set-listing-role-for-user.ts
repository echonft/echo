import { getNftsForOwner } from '@echo/firestore/crud/nft/get-nfts-for-owner'
import { nftsCollectionSlug } from '@echo/model/helpers/nft/nfts-collection-slug'
import type { Listing } from '@echo/model/types/listing'
import type { Nft } from '@echo/model/types/nft'
import type { User } from '@echo/model/types/user'
import { setListingRoleCreator } from '@echo/ui/helpers/listing/set-listing-role-creator'
import { setListingRoleTarget } from '@echo/ui/helpers/listing/set-listing-role-target'
import { setListingRoleUndefined } from '@echo/ui/helpers/listing/set-listing-role-undefined'
import type { ListingWithRole } from '@echo/ui/types/listing-with-role'
import type { Nullable } from '@echo/utils/types/nullable'
import { any, equals, isNil, pipe } from 'ramda'

export function setListingRoleForUser(user: Nullable<User>) {
  return async function (listing: Listing): Promise<ListingWithRole> {
    if (isNil(user)) {
      return setListingRoleUndefined(listing)
    }
    const { username } = user
    if (listing.creator.username === username) {
      return setListingRoleCreator(listing)
    }
    const nfts = await getNftsForOwner(user.username)
    if (pipe<[Nft[]], string[], boolean>(nftsCollectionSlug, any(equals(listing.target.collection.slug)))(nfts)) {
      return setListingRoleTarget(listing)
    }
    return setListingRoleUndefined(listing)
  }
}
