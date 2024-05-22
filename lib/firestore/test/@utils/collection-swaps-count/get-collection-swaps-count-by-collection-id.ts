import { getCollectionSwapsCountCollectionReference } from '@echo/firestore/helpers/collection-reference/get-collection-swaps-count-collection-reference'
import { getDocumentSnapshotData } from '@echo/firestore/helpers/crud/document/get-document-snapshot-data'
import { getQueryUniqueDocumentSnapshot } from '@echo/firestore/helpers/crud/query/get-query-unique-document-snapshot'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import { type CollectionSwapsCount } from '@echo/firestore/types/model/collection-swaps-count/collection-swaps-count'
import type { Nullable } from '@echo/utils/types/nullable'
import type { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { andThen, pipe } from 'ramda'

export function getCollectionSwapsCountSnapshotByCollectionId(
  collectionId: string
): Promise<Nullable<QueryDocumentSnapshot<CollectionSwapsCount>>> {
  return pipe(
    getCollectionSwapsCountCollectionReference,
    queryWhere('collectionId', '==', collectionId),
    getQueryUniqueDocumentSnapshot
  )()
}

export function getCollectionSwapsCountByCollectionId(collectionId: string): Promise<Nullable<CollectionSwapsCount>> {
  return pipe(getCollectionSwapsCountSnapshotByCollectionId, andThen(getDocumentSnapshotData))(collectionId)
}
