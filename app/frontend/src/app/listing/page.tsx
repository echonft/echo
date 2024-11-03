import { getCollection } from '@echo/firestore/crud/collection/get-collection'
import { getNftByIndex } from '@echo/firestore/crud/nft/get-nft-by-index'
import { getNftsForOwner } from '@echo/firestore/crud/nft/get-nfts-for-owner'
import { withLoggedInUser } from '@echo/frontend/lib/decorators/with-logged-in-user'
import { captureAndLogError } from '@echo/frontend/lib/helpers/capture-and-log-error'
import { nftIsOwnedBy } from '@echo/model/helpers/nft/nft-is-owned-by'
import type { Listing } from '@echo/model/types/listing'
import type { Nft, OwnedNft } from '@echo/model/types/nft'
import type { Slug } from '@echo/model/types/slug'
import type { User } from '@echo/model/types/user'
import { getNftIndexFromSearchParam } from '@echo/routing/search-params/get-nft-index-from-search-param'
import { NavigationSectionLayout } from '@echo/ui/components/base/layout/navigation-section-layout'
import { CreateListingManager } from '@echo/ui/components/listing/create/create-listing-manager'
import { isNilOrEmpty } from '@echo/utils/helpers/is-nil-or-empty'
import { promiseAll } from '@echo/utils/helpers/promise-all'
import { unlessNil } from '@echo/utils/helpers/unless-nil'
import type { Nullable } from '@echo/utils/types/nullable'
import { notFound } from 'next/navigation'
import {
  always,
  andThen,
  filter,
  identity,
  is,
  isEmpty,
  isNil,
  juxt,
  map,
  otherwise,
  pipe,
  prop,
  reject,
  unless
} from 'ramda'

interface Props {
  searchParams: {
    items?: string[] | string
    target?: Slug
  }
  user: User
}

async function render({ searchParams: { items, target }, user }: Props) {
  // Cannot go to that page without previously selected data
  if (isNilOrEmpty(items) && isNilOrEmpty(target)) {
    notFound()
  }
  const listingItems = await unlessNil(
    pipe(
      unless(is(Array), juxt([identity])),
      map(getNftIndexFromSearchParam),
      map(getNftByIndex),
      promiseAll,
      andThen<Nullable<Nft>[], OwnedNft[]>(
        pipe<[Nullable<Nft>[]], Nft[], OwnedNft[]>(reject(isNil), filter(nftIsOwnedBy(user.username)))
      ),
      otherwise(pipe(captureAndLogError, always([])))
    )
  )(items)
  const listingTarget = await unlessNil(pipe(getCollection, otherwise(pipe(captureAndLogError, always(undefined)))))(
    target
  )
  if (isNilOrEmpty(listingItems) && isNil(listingTarget)) {
    notFound()
  }
  const creatorNfts = await pipe(
    prop('username'),
    getNftsForOwner,
    otherwise(pipe(captureAndLogError, always([])))
  )(user)
  if (isEmpty(listingItems) && isEmpty(creatorNfts)) {
    notFound()
  }

  return (
    <NavigationSectionLayout>
      <CreateListingManager
        creator={user as Listing['creator']} // TODO gatekeep route with connected wallet
        creatorNfts={creatorNfts}
        items={listingItems}
        target={listingTarget}
      />
    </NavigationSectionLayout>
  )
}

export default withLoggedInUser(render)
