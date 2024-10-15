import { getCollectionById } from '@echo/firestore/crud/collection/get-collection-by-id'
import type { CollectionSwapsCountDocumentData } from '@echo/firestore/types/model/collection-swaps-count-document-data'
import type { CollectionWithSwapsCount } from '@echo/model/types/collection-with-swaps-count'
import { assoc, isNil } from 'ramda'

export async function getCollectionForSwapsCount(
  swapsCount: CollectionSwapsCountDocumentData
): Promise<CollectionWithSwapsCount> {
  const collection = await getCollectionById(swapsCount.collectionId)
  if (isNil(collection)) {
    return Promise.reject(Error('collection not found'))
  }
  return assoc('swapsCount', swapsCount.swapsCount, collection)
}
