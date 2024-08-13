import type { SelectionSearchParams } from '@echo/api/types/routing/search-params/selection-search-params'
import { getCollectionWithCounts } from '@echo/firestore/crud/collection-with-counts/get-collection-with-counts'
import { getPendingListingsForCollection } from '@echo/firestore/crud/listing/get-pending-listings-for-collection'
import { getNftsForCollection } from '@echo/firestore/crud/nft/get-nfts-for-collection'
import { getCompletedOffersForCollection } from '@echo/firestore/crud/offer/get-completed-offers-for-collection'
import { getPendingOffersForCollection } from '@echo/firestore/crud/offer/get-pending-offers-for-collection'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import { captureAndLogError } from '@echo/frontend/lib/helpers/capture-and-log-error'
import { getPageSelection } from '@echo/frontend/lib/helpers/get-page-selection'
import { setListingsRole } from '@echo/frontend/lib/helpers/listing/set-listings-role'
import { setOfferRoleForUser } from '@echo/frontend/lib/helpers/offer/set-offer-role-for-user'
import type { NextParams } from '@echo/frontend/lib/types/next-params'
import type { PropsWithUser } from '@echo/frontend/lib/types/props-with-user'
import type { WithSearchParamsProps } from '@echo/frontend/lib/types/with-search-params-props'
import type { Swap } from '@echo/model/types/swap'
import type { WithSlug } from '@echo/model/types/with-slug'
import { NavigationPageLayout } from '@echo/ui/components/base/layout/navigation-page-layout'
import { NavigationSectionLayout } from '@echo/ui/components/base/layout/navigation-section-layout'
import { SectionLayout } from '@echo/ui/components/base/layout/section-layout'
import { CollectionDetails } from '@echo/ui/components/collection/details/collection-details'
import { CollectionTabs } from '@echo/ui/pages/collection/collection-tabs'
import { notFound } from 'next/navigation'
import { always, andThen, isNil, map, otherwise, pipe } from 'ramda'

async function render({
  params: { slug },
  searchParams,
  user
}: PropsWithUser<NextParams<WithSlug> & WithSearchParamsProps<SelectionSearchParams>>) {
  const collection = await pipe(getCollectionWithCounts, otherwise(pipe(captureAndLogError, always(undefined))))(slug)
  if (isNil(collection)) {
    notFound()
  }
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
  const selection = getPageSelection({ listings, offers, swaps, searchParams })

  return (
    <NavigationPageLayout user={user}>
      <SectionLayout>
        <CollectionDetails collection={collection} />
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
