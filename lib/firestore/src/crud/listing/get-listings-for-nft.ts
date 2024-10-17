import { getListingsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listings-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import { notReadOnlyListingStates } from '@echo/model/constants/listing-state'
import { nftIndex } from '@echo/model/helpers/nft/nft-index'
import { type Listing } from '@echo/model/types/listing/listing'
import type { NftIndex } from '@echo/model/types/nft/nft'
import { now } from '@echo/utils/helpers/now'
import { pipe } from 'ramda'

export function getListingsForNft(nft: NftIndex): Promise<Listing[]> {
  const index = nftIndex(nft)
  return pipe(
    getListingsCollectionReference,
    queryWhere('state', 'in', notReadOnlyListingStates),
    queryWhere('expiresAt', '>', now()),
    queryWhere('itemIndexes', 'array-contains', index),
    getQueryData
  )()
}
