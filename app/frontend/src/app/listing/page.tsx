import type { ListingSearchParams } from '@echo/api/types/routing/search-params/listing-search-params'
import { getCollection } from '@echo/firestore/crud/collection/get-collection'
import { getNftByIndex } from '@echo/firestore/crud/nft/get-nft-by-index'
import { getNftsForOwner } from '@echo/firestore/crud/nft/get-nfts-for-owner'
import { withLoggedInUser } from '@echo/frontend/lib/decorators/with-logged-in-user'
import { captureAndLogError } from '@echo/frontend/lib/helpers/capture-and-log-error'
import { getNftIndexFromQueryParam } from '@echo/frontend/lib/helpers/nft/get-nft-index-from-query-param'
import type { PropsWithAuthUser } from '@echo/frontend/lib/types/props-with-auth-user'
import type { WithSearchParamsProps } from '@echo/frontend/lib/types/with-search-params-props'
import { nftIsOwnedBy } from '@echo/model/helpers/nft/nft-is-owned-by'
import type { Nft, OwnedNft } from '@echo/model/types/nft'
import { NavigationSectionLayout } from '@echo/ui/components/base/layout/navigation-section-layout'
import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import { CreateListingManager } from '@echo/ui/components/listing/create/create-listing-manager'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { promiseAll } from '@echo/utils/fp/promise-all'
import { unlessNil } from '@echo/utils/fp/unless-nil'
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

async function render({
  searchParams: { items, target },
  user
}: PropsWithAuthUser<WithSearchParamsProps<ListingSearchParams>>) {
  // Cannot go to that page without previously selected data
  if (isNilOrEmpty(items) && isNilOrEmpty(target)) {
    notFound()
  }
  const listingItems = await unlessNil(
    pipe(
      unless(is(Array), juxt([identity])),
      map(getNftIndexFromQueryParam),
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
    <PageLayout user={user}>
      <NavigationSectionLayout>
        <CreateListingManager creatorNfts={creatorNfts} items={listingItems} target={listingTarget} />
      </NavigationSectionLayout>
    </PageLayout>
  )
}

export default withLoggedInUser(render)
