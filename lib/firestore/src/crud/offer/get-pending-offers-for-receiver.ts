import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { getQueryDocumentsData } from '@echo/firestore/helpers/crud/query/get-query-documents-data'
import { queryOrderBy } from '@echo/firestore/helpers/crud/query/query-order-by'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import { READ_ONLY_OFFER_STATES } from '@echo/model/constants/offer-states'
import { type Offer } from '@echo/model/types/offer'
import { pipe } from 'ramda'

export function getPendingOffersForReceiver(username: string): Promise<Offer[]> {
  return pipe(
    getOffersCollectionReference,
    queryWhere<Offer>('receiver.username', '==', username),
    queryWhere<Offer>('state', 'not-in', READ_ONLY_OFFER_STATES),
    queryOrderBy<Offer>('state'),
    queryOrderBy<Offer>('expiresAt', 'desc'),
    getQueryDocumentsData
  )()
}
