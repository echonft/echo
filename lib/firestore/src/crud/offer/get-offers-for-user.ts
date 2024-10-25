import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import { queryOrderBy } from '@echo/firestore/helpers/crud/query/query-order-by'
import { queryWhereFilter } from '@echo/firestore/helpers/crud/query/query-where-filter'
import type { OfferDocumentData } from '@echo/firestore/types/model/offer-document-data'
import { type Offer } from '@echo/model/types/offer'
import type { Username } from '@echo/model/types/username'
import { Filter, type Query } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

/**
 * Returns all offers for a user, that is if the user is either the sender or the receiver
 * @param username
 */
export function getOffersForUserQuery(username: Username): Query<Offer, OfferDocumentData> {
  return pipe(
    getOffersCollectionReference,
    queryWhereFilter(
      Filter.or(Filter.where('sender.username', '==', username), Filter.where('receiver.username', '==', username))
    ),
    queryOrderBy('expiresAt', 'desc')
  )()
}

export function getOffersForUser(username: Username): Promise<Offer[]> {
  return pipe(getOffersForUserQuery, getQueryData)(username)
}
