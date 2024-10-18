import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import { queryLimit } from '@echo/firestore/helpers/crud/query/query-limit'
import { queryOrderBy } from '@echo/firestore/helpers/crud/query/query-order-by'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import { OfferState } from '@echo/model/constants/offer-state'
import type { Offer } from '@echo/model/types/offer/offer'
import { pipe } from 'ramda'

export function getCompletedOffers(limit?: number): Promise<Offer[]> {
  return pipe(
    getOffersCollectionReference,
    queryWhere('state', '==', OfferState.Completed),
    queryOrderBy('expiresAt', 'desc'),
    queryLimit(limit),
    getQueryData
  )()
}
