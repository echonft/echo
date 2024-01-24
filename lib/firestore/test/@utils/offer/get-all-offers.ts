import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { getQuerySnapshot } from '@echo/firestore/helpers/crud/query/get-query-snapshot'
import { getQuerySnapshotDocumentsData } from '@echo/firestore/helpers/crud/query/get-query-snapshot-documents-data'
import type { Offer } from '@echo/model/types/offer'
import { andThen, pipe } from 'ramda'

export function getAllOffers() {
  return pipe(getOffersCollectionReference, getQuerySnapshot, andThen(getQuerySnapshotDocumentsData<Offer>))()
}
