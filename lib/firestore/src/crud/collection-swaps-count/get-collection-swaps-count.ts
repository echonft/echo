import { getCollectionSnapshot } from '@echo/firestore/crud/collection/get-collection'
import { getCollectionSwapsCountCollectionReference } from '@echo/firestore/helpers/collection-reference/get-collection-swaps-count-collection-reference'
import { getDocumentSnapshotData } from '@echo/firestore/helpers/crud/document/get-document-snapshot-data'
import { getQueryUniqueDocumentSnapshot } from '@echo/firestore/helpers/crud/query/get-query-unique-document-snapshot'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { CollectionSwapsCount } from '@echo/firestore/types/model/collection-swaps-count/collection-swaps-count'
import type { Nullable } from '@echo/utils/types/nullable'
import { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { andThen, isNil, pipe } from 'ramda'

export async function getCollectionSwapsCountSnapshot(
  slug: string
): Promise<Nullable<QueryDocumentSnapshot<CollectionSwapsCount>>> {
  const snapshot = await getCollectionSnapshot(slug)
  if (isNil(snapshot)) {
    return undefined
  }
  return pipe(
    getCollectionSwapsCountCollectionReference,
    queryWhere<CollectionSwapsCount>('collectionId', '==', snapshot.id),
    getQueryUniqueDocumentSnapshot
  )()
}

export function getCollectionSwapsCount(slug: string): Promise<Nullable<CollectionSwapsCount>> {
  return pipe(getCollectionSwapsCountSnapshot, andThen(getDocumentSnapshotData))(slug)
}
