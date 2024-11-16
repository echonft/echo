import { offersCollection } from '@echo/firestore/helpers/collection/collections'
import { getQueryData } from '@echo/firestore/helpers/query/get-query-data'
import { queryOrderBy } from '@echo/firestore/helpers/query/query-order-by'
import { queryWhere } from '@echo/firestore/helpers/query/query-where'
import { queryWhereFilter } from '@echo/firestore/helpers/query/query-where-filter'
import type { OfferDocument } from '@echo/firestore/types/model/offer-document'
import { Filter } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export function getPendingOffersForUser(username: string): Promise<OfferDocument[]> {
  return pipe(
    offersCollection,
    queryWhereFilter(
      Filter.or(Filter.where('sender.username', '==', username), Filter.where('receiver.username', '==', username))
    ),
    queryWhere('locked', '==', false),
    queryOrderBy('expiresAt', 'desc'),
    getQueryData
  )()
}
