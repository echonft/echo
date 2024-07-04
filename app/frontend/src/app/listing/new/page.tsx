import { getCollection } from '@echo/firestore/crud/collection/get-collection'
import { getNftByIndex } from '@echo/firestore/crud/nft/get-nft-by-index'
import { getNftsForOwner } from '@echo/firestore/crud/nft/get-nfts-for-owner'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import { getNftIndexFromQueryParam } from '@echo/frontend/lib/helpers/nft/get-nft-index-from-query-param'
import type { PropsWithUser } from '@echo/frontend/lib/types/props-with-user'
import type { WithSearchParamsProps } from '@echo/frontend/lib/types/with-search-params-props'
import type { Nft } from '@echo/model/types/nft'
import { PaddedSectionLayout } from '@echo/ui/components/base/layout/padded-section-layout'
import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import { CreateListingManager } from '@echo/ui/components/listing/create/create-listing-manager'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { promiseAll } from '@echo/utils/fp/promise-all'
import { unlessNil } from '@echo/utils/fp/unless-nil'
import type { Nullable } from '@echo/utils/types/nullable'
import { notFound } from 'next/navigation'
import { always, andThen, identity, is, isEmpty, isNil, juxt, map, otherwise, pipe, prop, reject, unless } from 'ramda'

async function render({
  searchParams: { items, target },
  user
}: PropsWithUser<
  WithSearchParamsProps<{
    items?: string[] | string
    target?: string
  }>
>) {
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
      andThen<Nullable<Nft>[], Nft[]>(reject(isNil)),
      otherwise(always([]))
    )
  )(items)
  const listingTarget = await unlessNil(pipe(getCollection, otherwise(always(undefined))))(target)
  if (isNil(listingItems) && isNil(listingTarget)) {
    notFound()
  }

  const creatorNfts = await pipe(prop('username'), getNftsForOwner, otherwise(always([])))(user)
  if (isEmpty(listingItems) && isEmpty(creatorNfts)) {
    notFound()
  }

  return (
    <PageLayout user={user}>
      <PaddedSectionLayout>
        <CreateListingManager creatorNfts={creatorNfts} items={listingItems} target={listingTarget} />
      </PaddedSectionLayout>
    </PageLayout>
  )
}

export default withUser(render)
