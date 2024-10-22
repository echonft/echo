import { getUserListingsCount } from '@echo/firestore/crud/user/counts/get-user-listings-count'
import { getUserNftsCount } from '@echo/firestore/crud/user/counts/get-user-nfts-count'
import { getUserOffersCount } from '@echo/firestore/crud/user/counts/get-user-offers-count'
import { getUserSwapsCount } from '@echo/firestore/crud/user/counts/get-user-swaps-count'
import type { WithCounts } from '@echo/model/types/with-counts'

export async function getUserCounts(username: string): Promise<WithCounts> {
  const listingsCount = await getUserListingsCount(username)
  const nftsCount = await getUserNftsCount(username)
  const offersCount = await getUserOffersCount(username)
  const swapsCount = await getUserSwapsCount(username)
  return { listingsCount, nftsCount, offersCount, swapsCount }
}
