import { getCollectionSwapsCountCollectionReference } from '@echo/firestore/helpers/collection-reference/get-collection-swaps-count-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import type { CollectionSwapsCountDocumentData } from '@echo/firestore/types/model/collection-swaps-count/collection-swaps-count-document-data'
import type { NewDocument } from '@echo/firestore/types/new-document'

export async function addCollectionSwapsCount(
  collectionId: string
): Promise<NewDocument<CollectionSwapsCountDocumentData>> {
  const data = { collectionId, swapsCount: 0 }
  const id = await setReference<CollectionSwapsCountDocumentData, CollectionSwapsCountDocumentData>({
    collectionReference: getCollectionSwapsCountCollectionReference(),
    data
  })
  return { id, data }
}
