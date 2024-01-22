import { addCollectionSwapsCount } from '@echo/firestore/crud/collection-swaps-count/add-collection-swaps-count'
import { getCollectionsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-collections-collection-reference'
import { type Collection } from '@echo/model/types/collection'
import { assoc } from 'ramda'

export async function addCollection(collection: Omit<Collection, 'id'>) {
  const reference = getCollectionsCollectionReference().doc()
  const id = reference.id
  const newCollection: Collection = assoc('id', id, collection)
  await reference.set(newCollection)
  // add swaps count (to 0) in the database
  await addCollectionSwapsCount(id)
  return newCollection
}
