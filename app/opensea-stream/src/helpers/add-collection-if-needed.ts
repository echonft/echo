import { addCollection } from '@echo/firestore/crud/collection/add-collection'
import { getCollection } from '@echo/firestore/crud/collection/get-collection'
import type { Collection } from '@echo/model/types/collection'
import { getCollection as getCollectionFromOpensea } from '@echo/opensea/services/get-collection'
import { andThen, assoc, isNil, pipe, prop } from 'ramda'

/**
 * Adds a collection if it does not already exist.
 *
 * @param {string} slug - The slug of the collection.
 *
 * @return {Promise<Collection>} - The existing or newly created collection.
 */
export async function addCollectionIfNeeded(slug: string): Promise<Collection> {
  const collection = await getCollection(slug)
  // Collection is new, need to fetch it and then add it
  if (isNil(collection)) {
    const fetchedCollection = await getCollectionFromOpensea({ slug, fetch })
    return pipe(assoc('verified', false), addCollection, andThen(prop('data')))(fetchedCollection)
  }
  return collection
}
