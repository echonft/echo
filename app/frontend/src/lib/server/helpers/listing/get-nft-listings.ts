import { getListingsForNft } from '@echo/firestore'
import type { ListingQueryFilters, QueryConstraints } from '@echo/firestore-types'
import { ServerError } from '@server/helpers/error/server-error'

export async function getNftListings(nftId: string, filters?: ListingQueryFilters, constraints?: QueryConstraints) {
  try {
    return await getListingsForNft(nftId, filters, constraints)
  } catch (e) {
    throw new ServerError(
      `error getting nft with id ${nftId} listings with filters ${JSON.stringify(
        filters
      )} and constraints ${JSON.stringify(constraints)}`,
      e
    )
  }
}
