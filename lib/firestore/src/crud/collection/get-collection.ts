import { getCollectionsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-collections-collection-reference'
import { getDocumentSnapshotData } from '@echo/firestore/helpers/crud/document/get-document-snapshot-data'
import { getQueryUniqueDocumentSnapshot } from '@echo/firestore/helpers/crud/query/get-query-unique-document-snapshot'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { CollectionDocumentData } from '@echo/firestore/types/model/collection-document-data'
import type { Collection } from '@echo/model/types/collection'
import type { Nullable } from '@echo/utils/types/nullable'
import { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { andThen, pipe } from 'ramda'

export function getCollectionSnapshot(
  slug: string
): Promise<Nullable<QueryDocumentSnapshot<Collection, CollectionDocumentData>>> {
  return pipe(getCollectionsCollectionReference, queryWhere('slug', '==', slug), getQueryUniqueDocumentSnapshot)()
}

export function getCollection(slug: string): Promise<Nullable<Collection>> {
  return pipe(getCollectionSnapshot, andThen(getDocumentSnapshotData))(slug)
}
