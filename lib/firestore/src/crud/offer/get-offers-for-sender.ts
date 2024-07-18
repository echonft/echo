import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import { queryOrderBy } from '@echo/firestore/helpers/crud/query/query-order-by'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import { OFFER_STATE_COMPLETED } from '@echo/model/constants/offer-states'
import { type Offer } from '@echo/model/types/offer'
import { pipe } from 'ramda'

export function getOffersForSender(username: string): Promise<Offer[]> {
  return pipe(
    getOffersCollectionReference,
    queryWhere<Offer>('sender.username', '==', username),
    queryWhere('state', '!=', OFFER_STATE_COMPLETED),
    queryOrderBy<Offer>('createdAt', 'desc'),
    getQueryData
  )()
}
