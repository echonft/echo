import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { getDocumentSnapshotData } from '@echo/firestore/helpers/crud/document/get-document-snapshot-data'
import { getQueryUniqueDocumentSnapshot } from '@echo/firestore/helpers/crud/query/get-query-unique-document-snapshot'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { OfferDocumentData } from '@echo/firestore/types/model/offer-document-data'
import type { Offer } from '@echo/model/types/offer/offer'
import type { Nullable } from '@echo/utils/types/nullable'
import { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { andThen, pipe } from 'ramda'

export function getOfferSnapshot(slug: string): Promise<Nullable<QueryDocumentSnapshot<Offer, OfferDocumentData>>> {
  return pipe(getOffersCollectionReference, queryWhere('slug', '==', slug), getQueryUniqueDocumentSnapshot)()
}

export function getOffer(slug: string): Promise<Nullable<Offer>> {
  return pipe(getOfferSnapshot, andThen(getDocumentSnapshotData))(slug)
}
