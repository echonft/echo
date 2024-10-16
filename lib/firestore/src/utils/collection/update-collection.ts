import { CollectionError } from '@echo/firestore/constants/errors/collection-error'
import { getCollectionSnapshot } from '@echo/firestore/crud/collection/get-collection'
import { getCollectionsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-collections-collection-reference'
import { updateReference } from '@echo/firestore/helpers/crud/reference/update-reference'
import type { Collection } from '@echo/model/types/collection/collection'
import { isNil } from 'ramda'

export async function updateCollection(slug: string, data: Partial<Collection>): Promise<Collection> {
  const snapshot = await getCollectionSnapshot(slug)
  if (isNil(snapshot)) {
    return Promise.reject(Error(CollectionError.NotFound))
  }
  return updateReference({
    collectionReference: getCollectionsCollectionReference(),
    id: snapshot.id,
    data
  })
}
