import { collectionsCollection } from '@echo/firestore/helpers/collection/collections'
import { getDocumentSnapshotData } from '@echo/firestore/helpers/document/get-document-snapshot-data'
import { getQueryUniqueDocumentSnapshot } from '@echo/firestore/helpers/query/get-query-unique-document-snapshot'
import { queryWhere } from '@echo/firestore/helpers/query/query-where'
import type { CollectionDocument } from '@echo/firestore/types/model/collection-document'
import type { Slug } from '@echo/model/types/slug'
import type { Nullable } from '@echo/utils/types/nullable'
import { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { andThen, pipe } from 'ramda'

export function getCollectionSnapshot(slug: Slug): Promise<Nullable<QueryDocumentSnapshot<CollectionDocument>>> {
  return pipe(collectionsCollection, queryWhere('slug', '==', slug), getQueryUniqueDocumentSnapshot)()
}

export function getCollection(slug: Slug): Promise<Nullable<CollectionDocument>> {
  return pipe(getCollectionSnapshot, andThen(getDocumentSnapshotData))(slug)
}
