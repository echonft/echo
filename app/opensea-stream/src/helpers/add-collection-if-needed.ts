import { addCollection } from '@echo/firestore/crud/collection/add-collection'
import { getCollection } from '@echo/firestore/crud/collection/get-collection'
import type { Collection } from '@echo/model/types/collection'
import { getCollection as getCollectionFromOpensea } from '@echo/opensea/services/get-collection'
import type { GetCollectionRequest } from '@echo/opensea/types/request/get-collection-request'
import { andThen, assoc, isNil, pipe, prop } from 'ramda'

/**
 * Adds a collection if it does not already exist.
 *
 * @param {Omit<GetCollectionRequest, 'fetch'>} args
 * @return {Promise<Collection>} - The existing or newly created collection.
 */
export async function addCollectionIfNeeded(args: Omit<GetCollectionRequest, 'fetch'>): Promise<Collection> {
  const collection = await getCollection(args.slug)
  // Collection is new, need to fetch it and then add it
  if (isNil(collection)) {
    const fetchedCollection = await pipe(assoc('fetch', fetch), getCollectionFromOpensea)(args)
    return pipe(assoc('verified', false), addCollection, andThen(prop('data')))(fetchedCollection)
  }
  return collection
}
