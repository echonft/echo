import { ServerError } from '../error/server-error'
import { getListingsForNft } from '@echo/firestore'
import { ListingQueryFilters, QueryConstraints } from '@echo/firestore-types'

export async function getNftListings(nftId: string, constraints?: QueryConstraints, filters?: ListingQueryFilters) {
  try {
    return await getListingsForNft(nftId, filters, constraints)
  } catch (e) {
    throw new ServerError()
  }
}
