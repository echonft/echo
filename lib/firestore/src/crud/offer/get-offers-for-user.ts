import { offersCollection } from '@echo/firestore/helpers/collection/collections'
import { getQueryData } from '@echo/firestore/helpers/query/get-query-data'
import { queryOrderBy } from '@echo/firestore/helpers/query/query-order-by'
import { queryWhereFilter } from '@echo/firestore/helpers/query/query-where-filter'
import type { OfferDocument } from '@echo/firestore/types/model/offer-document'
import { Filter, type Query } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

/**
 * Returns all offers for a user, that is if the user is either the sender or the receiver
 * @param username
 */
export function getOffersForUserQuery(username: string): Query<OfferDocument> {
  return pipe(
    offersCollection,
    queryWhereFilter(
      Filter.or(Filter.where('sender.username', '==', username), Filter.where('receiver.username', '==', username))
    ),
    queryOrderBy('expiresAt', 'desc')
  )()
}

export function getOffersForUser(username: string): Promise<OfferDocument[]> {
  return pipe(getOffersForUserQuery, getQueryData)(username)
}
