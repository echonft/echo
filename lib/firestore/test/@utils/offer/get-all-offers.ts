import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { getQuerySnapshot } from '@echo/firestore/helpers/crud/query/get-query-snapshot'
import { getQuerySnapshotData } from '@echo/firestore/helpers/crud/query/get-query-snapshot-data'
import type { Offer } from '@echo/model/types/offer'
import { andThen, pipe } from 'ramda'

export function getAllOffers() {
  return pipe(getOffersCollectionReference, getQuerySnapshot, andThen(getQuerySnapshotData<Offer>))()
}
