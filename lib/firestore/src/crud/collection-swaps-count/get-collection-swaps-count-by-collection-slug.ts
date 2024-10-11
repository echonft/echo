import { getCollectionSwapsCountSnapshotByCollectionId } from '@echo/firestore/crud/collection-swaps-count/get-collection-swaps-count-by-collection-id'
import { getCollectionSnapshot } from '@echo/firestore/crud/collection/get-collection'
import { getDocumentSnapshotData } from '@echo/firestore/helpers/crud/document/get-document-snapshot-data'
import { type CollectionSwapsCountDocumentData } from '@echo/firestore/types/model/collection-swaps-count/collection-swaps-count-document-data'
import type { Nullable } from '@echo/utils/types/nullable'
import type { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { andThen, isNil, pipe } from 'ramda'

export async function getCollectionSwapsCountSnapshotByCollectionSlug(
  slug: string
): Promise<Nullable<QueryDocumentSnapshot<CollectionSwapsCountDocumentData, CollectionSwapsCountDocumentData>>> {
  const collectionSnapshot = await getCollectionSnapshot(slug)
  if (isNil(collectionSnapshot)) {
    return Promise.reject(Error(`collection with slug ${slug} does not exist`))
  }
  return getCollectionSwapsCountSnapshotByCollectionId(collectionSnapshot.id)
}

export function getCollectionSwapsCountByCollectionSlug(
  slug: string
): Promise<Nullable<CollectionSwapsCountDocumentData>> {
  return pipe(getCollectionSwapsCountSnapshotByCollectionSlug, andThen(getDocumentSnapshotData))(slug)
}
