import { offersCollection } from '@echo/firestore/helpers/collection/collections'
import { queryOrderBy } from '@echo/firestore/helpers/query/query-order-by'
import { queryWhereFilter } from '@echo/firestore/helpers/query/query-where-filter'
import type { OfferDocument } from '@echo/firestore/types/model/offer-document'
import type { Username } from '@echo/model/types/username'
import { Filter, type Query } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

/**
 * Returns the query for all offers created by a user
 * @param username
 */
export function getCreatedOffersForUserQuery(username: Username): Query<OfferDocument> {
  return pipe(
    offersCollection,
    queryWhereFilter(Filter.where('sender.username', '==', username)),
    queryOrderBy('expiresAt', 'desc')
  )()
}
