import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import { queryOrderBy } from '@echo/firestore/helpers/crud/query/query-order-by'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import { type Offer } from '@echo/model/types/offer'
import type { Username } from '@echo/model/types/username'
import { pipe } from 'ramda'

export function getPendingOffersForReceiver(username: Username): Promise<Offer[]> {
  return pipe(
    getOffersCollectionReference,
    queryWhere('receiver.username', '==', username),
    queryWhere('locked', '==', false),
    queryOrderBy('expiresAt', 'desc'),
    getQueryData
  )()
}
