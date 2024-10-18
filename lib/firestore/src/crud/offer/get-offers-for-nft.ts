import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import { queryWhereFilter } from '@echo/firestore/helpers/crud/query/query-where-filter'
import { notReadOnlyOfferStates } from '@echo/model/constants/offer-state'
import { nftIndex } from '@echo/model/helpers/nft/nft-index'
import type { NftIndex } from '@echo/model/types/nft/nft'
import { type Offer } from '@echo/model/types/offer/offer'
import { now } from '@echo/utils/helpers/now'
import { Filter } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export function getOffersForNft(nft: NftIndex): Promise<Offer[]> {
  const index = nftIndex(nft)
  return pipe(
    getOffersCollectionReference,
    queryWhere('state', 'in', notReadOnlyOfferStates),
    queryWhere('expiresAt', '>', now()),
    queryWhere('senderItemIndexes', 'array-contains', index),
    queryWhereFilter(
      Filter.or(
        Filter.where('receiverItemIndexes', 'array-contains', index),
        Filter.where('senderItemIndexes', 'array-contains', index)
      )
    ),
    getQueryData
  )()
}
