import { getCollectionSwapsCountByCollectionSlug } from '@echo/firestore/crud/collection-swaps-count/get-collection-swaps-count-by-collection-slug'
import { getCollectionListingsCount } from '@echo/firestore/crud/collection-with-counts/get-collection-listings-count'
import { getCollectionNftsCount } from '@echo/firestore/crud/collection-with-counts/get-collection-nfts-count'
import { getCollectionOffersCount } from '@echo/firestore/crud/collection-with-counts/get-collection-offers-count'
import { getCollectionById } from '@echo/firestore/crud/collection/get-collection-by-id'
import type { CollectionWithCounts } from '@echo/model/types/collection/collection-with-counts'
import { unlessNil } from '@echo/utils/fp/unless-nil'
import type { Nullable } from '@echo/utils/types/nullable'
import { andThen, assoc, isNil, pipe } from 'ramda'

export async function getCollectionWithCounts(collectionSlug: string): Promise<Nullable<CollectionWithCounts>> {
  const listingsCount = await getCollectionListingsCount(collectionSlug)
  const nftsCount = await getCollectionNftsCount(collectionSlug)
  const offersCount = await getCollectionOffersCount(collectionSlug)
  const swapsCount = await getCollectionSwapsCountByCollectionSlug(collectionSlug)
  if (isNil(swapsCount)) {
    return undefined
  }
  return pipe(
    getCollectionById,
    andThen(
      unlessNil(
        pipe(
          assoc('listingsCount', listingsCount),
          assoc('nftsCount', nftsCount),
          assoc('offersCount', offersCount),
          assoc('swapsCount', swapsCount.swapsCount)
        )
      )
    )
  )(swapsCount.collectionId)
}
