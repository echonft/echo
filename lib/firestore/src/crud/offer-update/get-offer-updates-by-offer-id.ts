import { getOfferUpdatesCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-updates-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { OfferUpdate } from '@echo/firestore/types/model/offer-update/offer-update'
import { pipe } from 'ramda'

export function getOfferUpdatesByOfferId(offerId: string): Promise<OfferUpdate[]> {
  return pipe(getOfferUpdatesCollectionReference, queryWhere<OfferUpdate>('offerId', '==', offerId), getQueryData)()
}
