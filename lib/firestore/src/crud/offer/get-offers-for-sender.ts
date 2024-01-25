import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import { queryOrderBy } from '@echo/firestore/helpers/crud/query/query-order-by'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import { type Offer } from '@echo/model/types/offer'
import { pipe } from 'ramda'

export function getOffersForSender(username: string): Promise<Offer[]> {
  return pipe(
    getOffersCollectionReference,
    queryWhere<Offer>('sender.username', '==', username),
    queryOrderBy<Offer>('createdAt', 'desc'),
    getQueryData
  )()
}
