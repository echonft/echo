import { getCollectionListingsCount } from '@echo/firestore/crud/collection-with-counts/get-collection-listings-count'
import { getCollectionNftsCount } from '@echo/firestore/crud/collection-with-counts/get-collection-nfts-count'
import { getCollectionOffersCount } from '@echo/firestore/crud/collection-with-counts/get-collection-offers-count'
import { getCollectionSwapsCount } from '@echo/firestore/crud/collection-with-counts/get-collection-swaps-count'
import type { WithCounts } from '@echo/model/types/with-counts'

export async function getCollectionCounts(collectionSlug: string): Promise<WithCounts> {
  const listingsCount = await getCollectionListingsCount(collectionSlug)
  const nftsCount = await getCollectionNftsCount(collectionSlug)
  const offersCount = await getCollectionOffersCount(collectionSlug)
  const swapsCount = await getCollectionSwapsCount(collectionSlug)
  return { listingsCount, nftsCount, offersCount, swapsCount }
}
