import { offersCollection } from '@echo/firestore/helpers/collection/collections'
import { getQueryData } from '@echo/firestore/helpers/query/get-query-data'
import { queryOrderBy } from '@echo/firestore/helpers/query/query-order-by'
import { queryWhere } from '@echo/firestore/helpers/query/query-where'
import type { OfferDocument } from '@echo/firestore/types/model/offer-document'
import type { Username } from '@echo/model/types/username'
import { pipe } from 'ramda'

export function getPendingOffersForReceiver(username: Username): Promise<OfferDocument[]> {
  return pipe(
    offersCollection,
    queryWhere('receiver.username', '==', username),
    queryWhere('locked', '==', false),
    queryOrderBy('expiresAt', 'desc'),
    getQueryData
  )()
}
