import { getCollection } from '@echo/firestore/crud/collection/get-collection'
import { getCollectionCounts } from '@echo/firestore/crud/collection/get-collection-counts'
import { getListingsForCollection } from '@echo/firestore/crud/listing/get-listings-for-collection'
import { getNftsForCollection } from '@echo/firestore/crud/nft/get-nfts-for-collection'
import { getOffersForCollection } from '@echo/firestore/crud/offer/get-offers-for-collection'
import { getSwapsForCollection } from '@echo/firestore/crud/swap/get-swaps-for-collection'
import type { OwnedNftDocument } from '@echo/firestore/types/model/nft-document'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import { captureAndLogError } from '@echo/frontend/lib/helpers/capture-and-log-error'
import { toListingsWithRole } from '@echo/frontend/lib/helpers/listing/to-listings-with-role'
import { toOffersWithRole } from '@echo/frontend/lib/helpers/offer/to-offers-with-role'
import { otherwiseEmptyArray } from '@echo/frontend/lib/helpers/otherwise-empty-array'
import { toSwapsWithRole } from '@echo/frontend/lib/helpers/swap/to-swaps-with-role'
import type { Collection } from '@echo/model/types/collection'
import type { OwnedNft } from '@echo/model/types/nft'
import type { User } from '@echo/model/types/user'
import { CollectionPage } from '@echo/ui/pages/collection/collection-page'
import type { Nullable } from '@echo/utils/types/nullable'
import { notFound } from 'next/navigation'
import { always, andThen, isNil, otherwise, pipe, prop } from 'ramda'

interface Props {
  params: {
    slug: Lowercase<string>
  }
  user: Nullable<User>
}

async function render({ params: { slug }, user }: Props) {
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
  const listings = await pipe(getListingsForCollection, andThen(toListingsWithRole(user)), otherwiseEmptyArray)(slug)
  const offers = await pipe(getOffersForCollection, andThen(toOffersWithRole(user)), otherwiseEmptyArray)(slug)
  const swaps = await pipe(getSwapsForCollection, andThen(toSwapsWithRole(user)), otherwiseEmptyArray)(slug)

  return (
    <CollectionPage
      collection={collection}
      counts={counts}
      listings={listings}
      nfts={nfts}
      offers={offers}
      swaps={swaps}
    />
  )
}

export default withUser(render)
