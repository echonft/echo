import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { getQuerySnapshotDocumentsData } from '@echo/firestore/helpers/crud/query/get-query-snapshot-documents-data'
import type { Offer } from '@echo/model/types/offer'
import { andThen, invoker, pipe } from 'ramda'

export function getAllOffers() {
  return pipe(getOffersCollectionReference, invoker(0, 'get'), andThen(getQuerySnapshotDocumentsData<Offer>))()
}
