import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import { queryOrderBy } from '@echo/firestore/helpers/crud/query/query-order-by'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import { queryWhereFilter } from '@echo/firestore/helpers/crud/query/query-where-filter'
import { NOT_READ_ONLY_OFFER_STATES } from '@echo/model/constants/offer-states'
import { type Offer } from '@echo/model/types/offer/offer'
import { now } from '@echo/utils/helpers/now'
import { Filter } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export function getPendingOffersForUser(username: string): Promise<Offer[]> {
  return pipe(
    getOffersCollectionReference,
    queryWhereFilter(
      Filter.or(Filter.where('sender.username', '==', username), Filter.where('receiver.username', '==', username))
    ),
    queryWhere('state', 'in', NOT_READ_ONLY_OFFER_STATES),
    queryWhere('expiresAt', '>', now()),
    queryOrderBy('expiresAt', 'desc'),
    getQueryData
  )()
}
