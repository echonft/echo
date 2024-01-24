import { addCollectionSwapsCount } from '@echo/firestore/crud/collection-swaps-count/add-collection-swaps-count'
import { getCollectionsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-collections-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import { type Collection } from '@echo/model/types/collection'
import { pipe } from 'ramda'

export async function addCollection(data: Omit<Collection, 'id'>): Promise<Collection> {
  const collection = await pipe(getCollectionsCollectionReference, setReference(data))()
  // add swaps count (to 0) in the database
  await addCollectionSwapsCount(collection.id)
  return collection
}
