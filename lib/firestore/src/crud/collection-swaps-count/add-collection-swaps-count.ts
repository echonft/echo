import { getCollectionSwapsCountCollectionReference } from '@echo/firestore/helpers/collection-reference/get-collection-swaps-count-collection-reference'
import type { CollectionSwapsCount } from '@echo/firestore/types/model/collection-swaps-count/collection-swaps-count'

export async function addCollectionSwapsCount(collectionId: string) {
  const reference = getCollectionSwapsCountCollectionReference().doc()
  const id = reference.id
  const document: CollectionSwapsCount = { collectionId, id, swapsCount: 0 }
  await reference.set(document)
  return document
}
