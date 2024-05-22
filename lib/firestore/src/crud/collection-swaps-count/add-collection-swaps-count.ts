import { getCollectionSwapsCountCollectionReference } from '@echo/firestore/helpers/collection-reference/get-collection-swaps-count-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import type { CollectionSwapsCount } from '@echo/firestore/types/model/collection-swaps-count/collection-swaps-count'
import type { NewDocument } from '@echo/firestore/types/new-document'

export async function addCollectionSwapsCount(collectionId: string): Promise<NewDocument<CollectionSwapsCount>> {
  const data = { collectionId, swapsCount: 0 }
  const id = await setReference<CollectionSwapsCount>({
    collectionReference: getCollectionSwapsCountCollectionReference(),
    data
  })
  return { id, data }
}
