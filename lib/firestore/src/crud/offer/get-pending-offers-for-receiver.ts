import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import { queryOrderBy } from '@echo/firestore/helpers/crud/query/query-order-by'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import { NOT_READ_ONLY_OFFER_STATES } from '@echo/model/constants/offer-states'
import { type Offer } from '@echo/model/types/offer/offer'
import { now } from '@echo/utils/helpers/now'
import { pipe } from 'ramda'

export function getPendingOffersForReceiver(username: string): Promise<Offer[]> {
  return pipe(
    getOffersCollectionReference,
    queryWhere('receiver.username', '==', username),
    queryWhere('expiresAt', '>', now()),
    queryWhere('state', 'in', NOT_READ_ONLY_OFFER_STATES),
    queryOrderBy('expiresAt', 'desc'),
    getQueryData
  )()
}
