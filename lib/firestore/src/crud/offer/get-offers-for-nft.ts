import { nftArrayIndex } from '@echo/firestore/array-indexers/nft/nft-array-index'
import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import { queryWhereFilter } from '@echo/firestore/helpers/crud/query/query-where-filter'
import type { NftIndex } from '@echo/model/types/nft'
import { type Offer } from '@echo/model/types/offer'
import { Filter } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export function getOffersForNft(nft: NftIndex): Promise<Offer[]> {
  const arrayIndex = nftArrayIndex(nft)
  return pipe(
    getOffersCollectionReference,
    queryWhere('locked', '==', false),
    queryWhereFilter(
      Filter.or(
        Filter.where('receiverItemIndexes', 'array-contains', arrayIndex),
        Filter.where('senderItemIndexes', 'array-contains', arrayIndex)
      )
    ),
    getQueryData
  )()
}
