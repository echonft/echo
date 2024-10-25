import { nftArrayIndex } from '@echo/firestore/array-indexers/nft/nft-array-index'
import { getListingsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listings-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import { type Listing } from '@echo/model/types/listing'
import type { NftIndex } from '@echo/model/types/nft'
import { pipe } from 'ramda'

export function getListingsForNft(nft: NftIndex): Promise<Listing[]> {
  const arrayIndex = nftArrayIndex(nft)
  return pipe(
    getListingsCollectionReference,
    queryWhere('locked', '==', false),
    queryWhere('itemIndexes', 'array-contains', arrayIndex),
    getQueryData
  )()
}
