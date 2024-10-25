import { nftArrayIndex } from '@echo/firestore/array-indexers/nft/nft-array-index'
import { offersCollection } from '@echo/firestore/helpers/collection/collections'
import { getQueryData } from '@echo/firestore/helpers/query/get-query-data'
import { queryWhere } from '@echo/firestore/helpers/query/query-where'
import { queryWhereFilter } from '@echo/firestore/helpers/query/query-where-filter'
import type { OfferDocument } from '@echo/firestore/types/model/offer-document'
import type { NftIndex } from '@echo/model/types/nft'
import { Filter } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export function getOffersForNft(nft: NftIndex): Promise<OfferDocument[]> {
  const arrayIndex = nftArrayIndex(nft)
  return pipe(
    offersCollection,
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
