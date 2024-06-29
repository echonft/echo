import { addCollectionSwapsCount } from '@echo/firestore/crud/collection-swaps-count/add-collection-swaps-count'
import { getCollection } from '@echo/firestore/crud/collection/get-collection'
import { getCollectionsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-collections-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import { generateUniqueCollectionSlug } from '@echo/firestore/helpers/generate-unique-collection-slug'
import type { CollectionSwapsCount } from '@echo/firestore/types/model/collection-swaps-count/collection-swaps-count'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { type Collection } from '@echo/model/types/collection'
import { assoc, isNil } from 'ramda'

export async function addCollection(data: Collection): Promise<
  NewDocument<Collection> & {
    swapsCount: NewDocument<CollectionSwapsCount>
  }
> {
  const uniqueSlug = await generateUniqueCollectionSlug(data.slug)
  const collectionBySlug = await getCollection(uniqueSlug)
  if (!isNil(collectionBySlug)) {
    return Promise.reject(Error(`a collection with slug ${uniqueSlug} already exists`))
  }
  const newData = assoc('slug', uniqueSlug, data)
  const collectionId = await setReference<Collection>({
    collectionReference: getCollectionsCollectionReference(),
    data: newData
  })
  // add swaps count (to 0) in the database
  const swapsCount = await addCollectionSwapsCount(collectionId)
  return { id: collectionId, data: newData, swapsCount }
}
