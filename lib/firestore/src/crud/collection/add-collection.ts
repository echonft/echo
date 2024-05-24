import { getCollection } from '@echo/firestore/crud/collection/get-collection'
import { addCollectionSwapsCount } from '@echo/firestore/crud/collection-swaps-count/add-collection-swaps-count'
import { getCollectionsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-collections-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import type { CollectionSwapsCount } from '@echo/firestore/types/model/collection-swaps-count/collection-swaps-count'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { type Collection } from '@echo/model/types/collection'
import { isNil } from 'ramda'

export async function addCollection(data: Collection): Promise<
  NewDocument<Collection> & {
    swapsCount: NewDocument<CollectionSwapsCount>
  }
> {
  const collectionBySlug = await getCollection(data.slug)
  if (!isNil(collectionBySlug)) {
    throw Error(`a collection with slug ${data.slug} already exists`)
  }
  const collectionId = await setReference<Collection>({
    collectionReference: getCollectionsCollectionReference(),
    data
  })
  // add swaps count (to 0) in the database
  const swapsCount = await addCollectionSwapsCount(collectionId)
  return { id: collectionId, data, swapsCount }
}
