import { offersCollection } from '@echo/firestore/helpers/collection/collections'
import { getDocumentSnapshotData } from '@echo/firestore/helpers/document/get-document-snapshot-data'
import { getQueryUniqueDocumentSnapshot } from '@echo/firestore/helpers/query/get-query-unique-document-snapshot'
import { queryWhere } from '@echo/firestore/helpers/query/query-where'
import type { OfferDocument } from '@echo/firestore/types/model/offer-document'
import type { Slug } from '@echo/model/types/slug'
import type { Nullable } from '@echo/utils/types/nullable'
import { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { andThen, pipe } from 'ramda'

export function getOfferSnapshot(slug: Slug): Promise<Nullable<QueryDocumentSnapshot<OfferDocument>>> {
  return pipe(offersCollection, queryWhere('slug', '==', slug), getQueryUniqueDocumentSnapshot)()
}

export function getOffer(slug: Slug): Promise<Nullable<OfferDocument>> {
  return pipe(getOfferSnapshot, andThen(getDocumentSnapshotData))(slug)
}
