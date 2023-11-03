import { getListingsForNft } from '@echo/firestore/crud/listing/get-listings-for-nft'
import { type ListingQueryFilters } from '@echo/firestore/types/query/listing-query-filters'
import { type QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import { ServerError } from '@echo/frontend/lib/server/helpers/error/server-error'

export async function guarded_getListingsForNft(
  nftId: string,
  filters?: ListingQueryFilters,
  constraints?: QueryConstraints
) {
  try {
    return await getListingsForNft(nftId, filters, constraints)
  } catch (e) {
    throw new ServerError(
      `error getting listings for nft with id ${nftId} with filters ${JSON.stringify(
        filters
      )} and constraints ${JSON.stringify(constraints)}`,
      e
    )
  }
}
