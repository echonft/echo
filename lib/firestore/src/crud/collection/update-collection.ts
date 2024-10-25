import { getCollectionSnapshot } from '@echo/firestore/crud/collection/get-collection'
import { getCollectionsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-collections-collection-reference'
import { updateReference } from '@echo/firestore/helpers/crud/reference/update-reference'
import { CollectionError } from '@echo/model/constants/errors/collection-error'
import type { Collection } from '@echo/model/types/collection'
import type { Slug } from '@echo/model/types/slug'
import { isNil } from 'ramda'

export async function updateCollection(slug: Slug, data: Partial<Collection>): Promise<Collection> {
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
