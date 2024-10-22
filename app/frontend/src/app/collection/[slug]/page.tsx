import { getCollectionCounts } from '@echo/firestore/crud/collection-with-counts/get-collection-counts'
import { getCollection } from '@echo/firestore/crud/collection/get-collection'
import { getPendingListingsForCollection } from '@echo/firestore/crud/listing/get-pending-listings-for-collection'
import { getNftsForCollection } from '@echo/firestore/crud/nft/get-nfts-for-collection'
import { getCompletedOffersForCollection } from '@echo/firestore/crud/offer/get-completed-offers-for-collection'
import { getPendingOffersForCollection } from '@echo/firestore/crud/offer/get-pending-offers-for-collection'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import { captureAndLogError } from '@echo/frontend/lib/helpers/capture-and-log-error'
import type { NextParams } from '@echo/frontend/lib/types/next-params'
import type { PropsWithUser } from '@echo/frontend/lib/types/props-with-user'
import type { WithSearchParamsProps } from '@echo/frontend/lib/types/with-search-params-props'
import type { Swap } from '@echo/model/types/offer/swap'
import type { WithSlug } from '@echo/model/types/with-slug'
import { getSelectionFromSearchParams } from '@echo/routing/search-params/get-selection-from-search-params'
import type { SelectionSearchParams } from '@echo/routing/types/search-params/selection-search-params'
import { NavigationPageLayout } from '@echo/ui/components/base/layout/navigation-page-layout'
import { NavigationSectionLayout } from '@echo/ui/components/base/layout/navigation-section-layout'
import { SectionLayout } from '@echo/ui/components/base/layout/section-layout'
import { CollectionDetails } from '@echo/ui/components/collection/details/collection-details'
import { setListingsRole } from '@echo/ui/helpers/listing/set-listings-role'
import { setOfferRoleForUser } from '@echo/ui/helpers/offer/set-offer-role-for-user'
import { CollectionTabs } from '@echo/ui/pages/collection/collection-tabs'
import { notFound } from 'next/navigation'
import { always, andThen, isNil, map, mergeLeft, otherwise, pipe, prop } from 'ramda'

async function render({
  params: { slug },
  searchParams,
  user
}: PropsWithUser<NextParams<WithSlug> & WithSearchParamsProps<SelectionSearchParams>>) {
  const collection = await pipe(getCollection, otherwise(pipe(captureAndLogError, always(undefined))))(slug)
  if (isNil(collection)) {
    notFound()
  }
  const counts = await pipe(prop('slug'), getCollectionCounts)(collection)
  const nfts = await pipe(getNftsForCollection, otherwise(pipe(captureAndLogError, always([]))))(slug, {
    excludeOwner: user?.username
  })
  const listings = await pipe(
    getPendingListingsForCollection,
    andThen(setListingsRole(user)),
    otherwise(pipe(captureAndLogError, always([])))
  )(slug)
  const offers = await pipe(
    getPendingOffersForCollection,
    andThen(map(setOfferRoleForUser(user))),
    otherwise(pipe(captureAndLogError, always([])))
  )(slug)
  const swaps = (await pipe(
    getCompletedOffersForCollection,
    otherwise(pipe(captureAndLogError, always([])))
  )(slug)) as Swap[]
  const selection = getSelectionFromSearchParams({ listings, offers, swaps, searchParams })

  return (
    <NavigationPageLayout user={user}>
      <SectionLayout>
        <CollectionDetails collection={mergeLeft(collection, counts)} />
      </SectionLayout>
      <NavigationSectionLayout>
        <CollectionTabs
          collection={collection}
          listings={listings}
          nfts={nfts}
          offers={offers}
          swaps={swaps}
          selection={selection}
        />
      </NavigationSectionLayout>
    </NavigationPageLayout>
  )
}

export default withUser(render)
