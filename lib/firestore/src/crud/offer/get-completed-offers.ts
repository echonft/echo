import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { getQuerySnapshotDocumentsData } from '@echo/firestore/helpers/crud/query/get-query-snapshot-documents-data'
import { OFFER_STATE_COMPLETED } from '@echo/model/constants/offer-states'
import { isNil } from 'ramda'

export async function getCompletedOffers(limit?: number) {
  const query = getOffersCollectionReference().where('state', '==', OFFER_STATE_COMPLETED).orderBy('updatedAt', 'desc')
  const snapshot = isNil(limit) ? await query.get() : await query.limit(limit).get()
  return getQuerySnapshotDocumentsData(snapshot)
}
