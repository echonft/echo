import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import { queryOrderBy } from '@echo/firestore/helpers/crud/query/query-order-by'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import { notReadOnlyOfferStates } from '@echo/model/constants/offer-state'
import { type Offer } from '@echo/model/types/offer/offer'
import { now } from '@echo/utils/helpers/now'
import { pipe } from 'ramda'

export function getPendingOffersForReceiver(username: string): Promise<Offer[]> {
  return pipe(
    getOffersCollectionReference,
    queryWhere('receiver.username', '==', username),
    queryWhere('expiresAt', '>', now()),
    queryWhere('state', 'in', notReadOnlyOfferStates),
    queryOrderBy('expiresAt', 'desc'),
    getQueryData
  )()
}
