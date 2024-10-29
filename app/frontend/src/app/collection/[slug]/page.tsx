import { getCollection } from '@echo/firestore/crud/collection/get-collection'
import { getCollectionCounts } from '@echo/firestore/crud/collection/get-collection-counts'
import { getPendingListingsForCollection } from '@echo/firestore/crud/listing/get-pending-listings-for-collection'
import { getNftsForCollection } from '@echo/firestore/crud/nft/get-nfts-for-collection'
import { getPendingOffersForCollection } from '@echo/firestore/crud/offer/get-pending-offers-for-collection'
import { getSwapsForCollection } from '@echo/firestore/crud/swap/get-swaps-for-collection'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import { captureAndLogError } from '@echo/frontend/lib/helpers/capture-and-log-error'
import { toListingsWithRole } from '@echo/frontend/lib/helpers/listing/to-listings-with-role'
import { toOffersWithRole } from '@echo/frontend/lib/helpers/offer/to-offers-with-role'
import { toSwaps } from '@echo/frontend/lib/helpers/swap/to-swaps'
import type { Slug } from '@echo/model/types/slug'
import type { User } from '@echo/model/types/user'
import { getSelectionFromSearchParams } from '@echo/routing/search-params/get-selection-from-search-params'
import { NavigationLayout } from '@echo/ui/components/base/layout/navigation-layout'
import { NavigationSectionLayout } from '@echo/ui/components/base/layout/navigation-section-layout'
import { SectionLayout } from '@echo/ui/components/base/layout/section-layout'
import { CollectionDetails } from '@echo/ui/components/collection/details/collection-details'
import { CollectionTabs } from '@echo/ui/pages/collection/collection-tabs'
import type { Nullable } from '@echo/utils/types/nullable'
import { notFound } from 'next/navigation'
import { always, andThen, isNil, mergeLeft, otherwise, pipe, prop } from 'ramda'

interface Props {
  params: {
    slug: Slug
  }
  searchParams: {
    offer?: Slug
    listing?: Slug
    swap?: Slug
  }
  user: Nullable<User>
}

async function render({ params: { slug }, searchParams, user }: Props) {
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
    andThen(toListingsWithRole(user)),
    otherwise(pipe(captureAndLogError, always([])))
  )(slug)
  const offers = await pipe(
    getPendingOffersForCollection,
    andThen(toOffersWithRole(user)),
    otherwise(pipe(captureAndLogError, always([])))
  )(slug)
  const swaps = await pipe(
    getSwapsForCollection,
    andThen(toSwaps),
    otherwise(pipe(captureAndLogError, always([])))
  )(slug)
  const selection = getSelectionFromSearchParams({ listings, offers, swaps, searchParams })

  return (
    <NavigationLayout>
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
    </NavigationLayout>
  )
}

export default withUser(render)
