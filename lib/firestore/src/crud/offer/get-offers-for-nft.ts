import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { getQueriesDocuments } from '@echo/firestore/helpers/crud/query/get-queries-documents'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import { NOT_READ_ONLY_OFFER_STATES } from '@echo/model/constants/offer-states'
import { getNftIndex } from '@echo/model/helpers/nft/get-nft-index'
import type { NftIndex } from '@echo/model/types/nft'
import { type Offer } from '@echo/model/types/offer'
import { now } from '@echo/utils/helpers/now'
import { juxt, pipe } from 'ramda'

export function getOffersForNft(nft: NftIndex): Promise<Offer[]> {
  const index = getNftIndex(nft)
  return pipe(
    getOffersCollectionReference,
    queryWhere('state', 'in', NOT_READ_ONLY_OFFER_STATES),
    queryWhere('expiresAt', '>', now()),
    juxt([
      queryWhere<Offer>('receiverItemIndexes', 'array-contains', index),
      queryWhere<Offer>('senderItemIndexes', 'array-contains', index)
    ]),
    getQueriesDocuments
  )()
}
