import { getCollectionListingsCount } from '@echo/firestore/crud/collection/get-collection-listings-count'
import { getCollectionNftsCount } from '@echo/firestore/crud/collection/get-collection-nfts-count'
import { getCollectionOffersCount } from '@echo/firestore/crud/collection/get-collection-offers-count'
import { getCollectionSwapsCount } from '@echo/firestore/crud/collection/get-collection-swaps-count'
import type { Counts } from '@echo/model/types/counts'

export async function getCollectionCounts(slug: Lowercase<string>): Promise<Counts> {
  const listingsCount = await getCollectionListingsCount(slug)
  const nftsCount = await getCollectionNftsCount(slug)
  const offersCount = await getCollectionOffersCount(slug)
  const swapsCount = await getCollectionSwapsCount(slug)
  return { listingsCount, nftsCount, offersCount, swapsCount }
}
