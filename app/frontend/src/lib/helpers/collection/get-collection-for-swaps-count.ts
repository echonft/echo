import { getCollectionById } from '@echo/firestore/crud/collection/get-collection-by-id'
import type { CollectionSwapsCount } from '@echo/firestore/types/model/collection-swaps-count/collection-swaps-count'
import type { Collection } from '@echo/model/types/collection'
import { assoc, isNil } from 'ramda'

export async function getCollectionForSwapsCount(swapsCount: CollectionSwapsCount): Promise<Collection> {
  const collection = await getCollectionById(swapsCount.collectionId)
  if (isNil(collection)) {
    throw Error('collection not found')
  }
  return assoc('swapsCount', swapsCount.swapsCount, collection)
}
