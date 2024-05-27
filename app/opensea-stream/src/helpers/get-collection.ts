import { addCollection } from '@echo/firestore/crud/collection/add-collection'
import { getCollection as getCollectionFromFirestore } from '@echo/firestore/crud/collection/get-collection'
import type { Collection } from '@echo/model/types/collection'
import { getCollection as getCollectionFromOpensea } from '@echo/opensea/services/get-collection'
import type { GetCollectionRequest } from '@echo/opensea/types/request/get-collection-request'
import { pinoLogger } from '@echo/utils/services/pino-logger'
import { andThen, assoc, isNil, pipe, prop, tap } from 'ramda'

/**
 * Returns the collection for a given NFT.
 * Adds the collection if it does not exist already.
 *
 * @param {Omit<GetCollectionRequest, 'fetch'>} args
 * @return {Promise<Collection>} - The existing or newly created collection.
 */
export async function getCollection(args: Omit<GetCollectionRequest, 'fetch'>): Promise<Collection> {
  const { slug } = args
  const collection = await getCollectionFromFirestore(slug)
  // Collection is new, need to fetch it and then add it
  if (isNil(collection)) {
    pinoLogger.info(`Collection ${slug} not found, fetching...`)
    const fetchedCollection = await pipe(assoc('fetch', fetch), getCollectionFromOpensea)(args)
    return pipe(
      assoc('verified', false),
      addCollection,
      andThen(
        pipe(
          prop('data'),
          tap(() => {
            pinoLogger.info(`Added collection ${slug}`)
          })
        )
      )
    )(fetchedCollection)
  }
  return collection
}
