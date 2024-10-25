import { getCollectionListingsCount } from '@echo/firestore/crud/collection/counts/get-collection-listings-count'
import { getCollectionNftsCount } from '@echo/firestore/crud/collection/counts/get-collection-nfts-count'
import { getCollectionOffersCount } from '@echo/firestore/crud/collection/counts/get-collection-offers-count'
import { getCollectionSwapsCount } from '@echo/firestore/crud/collection/counts/get-collection-swaps-count'
import type { Counts } from '@echo/model/types/counts'
import type { Slug } from '@echo/model/types/slug'

export async function getCollectionCounts(slug: Slug): Promise<Counts> {
  const listingsCount = await getCollectionListingsCount(slug)
  const nftsCount = await getCollectionNftsCount(slug)
  const offersCount = await getCollectionOffersCount(slug)
  const swapsCount = await getCollectionSwapsCount(slug)
  return { listingsCount, nftsCount, offersCount, swapsCount }
}
