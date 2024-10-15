import { getOfferUpdatesCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-updates-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { OfferUpdateDocumentData } from '@echo/firestore/types/model/offer-update-document-data'
import { pipe } from 'ramda'

export function getOfferUpdatesByOfferId(offerId: string): Promise<OfferUpdateDocumentData[]> {
  return pipe(getOfferUpdatesCollectionReference, queryWhere('offerId', '==', offerId), getQueryData)()
}
