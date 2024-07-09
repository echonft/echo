import { addCollection as addCollectionToFirestore } from '@echo/firestore/crud/collection/add-collection'
import type { PartialWallet } from '@echo/firestore/types/model/wallet/wallet-document-data'
import type { Collection } from '@echo/model/types/collection'
import { getCollection } from '@echo/tasks/get-collection'
import type { WithFetch } from '@echo/utils/types/with-fetch'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { andThen, assoc, isNil, pipe } from 'ramda'

interface AddCollectionArgs extends WithFetch {
  contract: PartialWallet
}

/**
 * Adds the collection associated to a given contract if it does not exist already
 * @param args
 * @throws Error returns a rejected promise if the collection is not found
 * @throws Error returns a rejected promise if the collection could not have been added to Firestore
 */
export async function addCollection(args: WithLoggerType<AddCollectionArgs>): Promise<Collection> {
  const { collection, source } = await getCollection(args)
  if (isNil(collection)) {
    return Promise.reject(Error('collection not found'))
  }
  if (source === 'api') {
    return await pipe(
      addCollectionToFirestore,
      andThen(({ id, data }) => {
        const newCollection = assoc('id', id, data)
        args.logger?.info({ collection: newCollection }, 'added collection')
        return newCollection
      })
    )(collection)
  }
  return collection
}
