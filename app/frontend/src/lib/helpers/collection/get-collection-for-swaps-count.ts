import { findCollectionById } from '@echo/firestore/crud/collection/find-collection-by-id'
import type { CollectionSwapsCount } from '@echo/firestore/types/model/collection-swaps-count/collection-swaps-count'
import type { Collection } from '@echo/model/types/collection'
import { assoc, isNil } from 'ramda'

export async function getCollectionForSwapsCount(swapsCount: CollectionSwapsCount): Promise<Collection> {
  const collection = await findCollectionById(swapsCount.collectionId)
  if (isNil(collection)) {
    throw Error('collection not found')
  }
  return assoc('swapsCount', swapsCount.swapsCount, collection)
}
