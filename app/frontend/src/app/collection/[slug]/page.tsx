import { getCollection } from '@echo/firestore/crud/collection/get-collection'
import { getCollectionCounts } from '@echo/firestore/crud/collection/get-collection-counts'
import { getPendingListingsForCollection } from '@echo/firestore/crud/listing/get-pending-listings-for-collection'
import { getNftsForCollection } from '@echo/firestore/crud/nft/get-nfts-for-collection'
import { getPendingOffersForCollection } from '@echo/firestore/crud/offer/get-pending-offers-for-collection'
import { getSwapsForCollection } from '@echo/firestore/crud/swap/get-swaps-for-collection'
import type { OwnedNftDocument } from '@echo/firestore/types/model/nft-document'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import { captureAndLogError } from '@echo/frontend/lib/helpers/capture-and-log-error'
import { toListingsWithRole } from '@echo/frontend/lib/helpers/listing/to-listings-with-role'
import { toOffersWithRole } from '@echo/frontend/lib/helpers/offer/to-offers-with-role'
import { otherwiseEmptyArray } from '@echo/frontend/lib/helpers/otherwise-empty-array'
import { toSwaps } from '@echo/frontend/lib/helpers/swap/to-swaps'
import type { Collection } from '@echo/model/types/collection'
import type { OwnedNft } from '@echo/model/types/nft'
import type { Slug } from '@echo/model/types/slug'
import type { User } from '@echo/model/types/user'
import type { SelectionSearchParams } from '@echo/routing/types/frontend/search-params/selection-search-params'
import { selectionSearchParamsDataSchema } from '@echo/routing/validators/frontend/selection/selection-search-params-data-schema'
import { CollectionPage } from '@echo/ui/pages/collection/collection-page'
import type { Nullable } from '@echo/utils/types/nullable'
import { notFound } from 'next/navigation'
import { always, andThen, isNil, otherwise, pipe, prop } from 'ramda'

interface Props {
  params: {
    slug: Slug
  }
  searchParams?: SelectionSearchParams
  user: Nullable<User>
}

async function render({ params: { slug }, searchParams, user }: Props) {
  const collection = await pipe(
    getCollection,
    otherwise<Nullable<Collection>>(pipe(captureAndLogError, always(undefined)))
  )(slug)
  if (isNil(collection)) {
    notFound()
  }
  const counts = await pipe(prop('slug'), getCollectionCounts)(collection)
  const nfts: OwnedNft[] = await pipe(
    getNftsForCollection,
    otherwise<OwnedNftDocument[]>(pipe(captureAndLogError, always([] as OwnedNft[])))
  )(slug)
  const listings = await pipe(
    getPendingListingsForCollection,
    andThen(toListingsWithRole(user)),
    otherwiseEmptyArray
  )(slug)
  const offers = await pipe(getPendingOffersForCollection, andThen(toOffersWithRole(user)), otherwiseEmptyArray)(slug)
  const swaps = await pipe(getSwapsForCollection, andThen(toSwaps), otherwiseEmptyArray)(slug)
  const selection = selectionSearchParamsDataSchema.parse({ listings, offers, swaps, searchParams })

  return (
    <CollectionPage
      collection={collection}
      counts={counts}
      listings={listings}
      nfts={nfts}
      offers={offers}
      selection={selection}
      swaps={swaps}
    />
  )
}

export default withUser(render)
