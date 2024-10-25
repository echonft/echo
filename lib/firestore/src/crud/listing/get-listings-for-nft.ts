import { nftArrayIndex } from '@echo/firestore/array-indexers/nft/nft-array-index'
import { listingsCollection } from '@echo/firestore/helpers/collection/collections'
import { getQueryData } from '@echo/firestore/helpers/query/get-query-data'
import { queryWhere } from '@echo/firestore/helpers/query/query-where'
import type { ListingDocument } from '@echo/firestore/types/model/listing-document'
import type { NftIndex } from '@echo/model/types/nft'
import { pipe } from 'ramda'

export function getListingsForNft(nft: NftIndex): Promise<ListingDocument[]> {
  const arrayIndex = nftArrayIndex(nft)
  return pipe(
    listingsCollection,
    queryWhere('locked', '==', false),
    queryWhere('itemIndexes', 'array-contains', arrayIndex),
    getQueryData
  )()
}
