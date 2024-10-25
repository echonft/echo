import { getCollectionSnapshot } from '@echo/firestore/crud/collection/get-collection'
import { collectionsCollection } from '@echo/firestore/helpers/collection/collections'
import { updateReference } from '@echo/firestore/helpers/reference/update-reference'
import type { CollectionDocument } from '@echo/firestore/types/model/collection-document'
import { CollectionError } from '@echo/model/constants/errors/collection-error'
import type { Collection } from '@echo/model/types/collection'
import type { Slug } from '@echo/model/types/slug'
import { isNil } from 'ramda'

export async function updateCollection(slug: Slug, data: Partial<Collection>): Promise<CollectionDocument> {
  const snapshot = await getCollectionSnapshot(slug)
  if (isNil(snapshot)) {
    return Promise.reject(Error(CollectionError.NotFound))
  }
  return updateReference<CollectionDocument>({
    collectionReference: collectionsCollection(),
    id: snapshot.id,
    data: data
  })
}
