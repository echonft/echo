import { getCollectionSwapsCountCollectionReference } from '@echo/firestore/helpers/collection-reference/get-collection-swaps-count-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import type { CollectionSwapsCount } from '@echo/firestore/types/model/collection-swaps-count/collection-swaps-count'

export function addCollectionSwapsCount(collectionId: string): Promise<CollectionSwapsCount> {
  const data = { collectionId, swapsCount: 0 }
  await setReference<CollectionSwapsCount>({
    collectionReference: getCollectionSwapsCountCollectionReference(),
    data
  })
  return data
}
