import { addCollection } from '@echo/firestore/crud/collection/add-collection'
import { getCollection } from '@echo/firestore/crud/collection/get-collection'
import type { Collection } from '@echo/model/types/collection'
import { getCollection as getCollectionOpenSea } from '@echo/opensea/services/get-collection'
import { isNil } from 'ramda'

/**
 * Adds a collection if it does not already exist.
 *
 * @param {string} slug - The slug of the collection.
 *
 * @return {Promise<Collection>} - The existing or newly created collection.
 */
export async function addCollectionIfNeeded(slug: string): Promise<Collection> {
  let collection = await getCollection(slug)

  // Collection is new, need to fetch it and then add it
  if (isNil(collection)) {
    const fetchedCollection = await getCollectionOpenSea({ slug, fetch })
    // TODO validate this
    const createdCollection = await addCollection({ ...fetchedCollection, verified: false })
    // Update collection
    collection = createdCollection.data
  }
  return collection
}
