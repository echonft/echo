import { getCollectionsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-collections-collection-reference'
import { type Collection } from '@echo/model/types/collection'

export async function addCollection(collection: Omit<Collection, 'id'>) {
  const reference = getCollectionsCollectionReference().doc()
  const id = reference.id
  const newCollection = { ...collection, id } as Collection
  await reference.set(newCollection)
  return newCollection
}
