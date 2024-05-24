import { getCollectionSnapshot } from '@echo/firestore/crud/collection/get-collection'
import { getDocumentSnapshotData } from '@echo/firestore/helpers/crud/document/get-document-snapshot-data'
import { type CollectionSwapsCount } from '@echo/firestore/types/model/collection-swaps-count/collection-swaps-count'
import { getCollectionSwapsCountSnapshotByCollectionId } from '@echo/firestore-test/collection-swaps-count/get-collection-swaps-count-by-collection-id'
import type { Nullable } from '@echo/utils/types/nullable'
import type { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { andThen, isNil, pipe } from 'ramda'

export async function getCollectionSwapsCountSnapshotByCollectionSlug(
  slug: string
): Promise<Nullable<QueryDocumentSnapshot<CollectionSwapsCount>>> {
  const collectionSnapshot = await getCollectionSnapshot(slug)
  if (isNil(collectionSnapshot)) {
    throw Error(`collection with slug ${slug} does not exist`)
  }
  return getCollectionSwapsCountSnapshotByCollectionId(collectionSnapshot.id)
}

export function getCollectionSwapsCountByCollectionSlug(slug: string): Promise<Nullable<CollectionSwapsCount>> {
  return pipe(getCollectionSwapsCountSnapshotByCollectionSlug, andThen(getDocumentSnapshotData))(slug)
}
