import { addCollection as addCollectionToFirestore } from '@echo/firestore/crud/collection/add-collection'
import type { Collection } from '@echo/model/types/collection'
import type { Wallet } from '@echo/model/types/wallet'
import { getCollection } from '@echo/tasks/get-collection'
import type { Nullable } from '@echo/utils/types/nullable'
import type { WithFetch } from '@echo/utils/types/with-fetch'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { andThen, assoc, isNil, otherwise, pipe } from 'ramda'

interface AddCollectionArgs<T extends Wallet> extends WithFetch {
  contract: T
}

/**
 * Adds the collection associated to a given contract if it does not exist already
 */
export async function addCollection<T extends Wallet>(
  args: WithLoggerType<AddCollectionArgs<T>>
): Promise<Nullable<Collection>> {
  const logger = args.logger?.child({ fn: addCollection.name })
  const { collection, source } = await getCollection(assoc('logger', logger, args))
  if (source === 'api' && !isNil(collection)) {
    await pipe(
      addCollectionToFirestore,
      andThen(({ id, data }) => {
        args.logger?.info({ collection: assoc('id', id, data) }, 'added collection')
      }),
      otherwise((err) => {
        logger?.error({ err, collection: { contract: args.contract } }, 'could not add collection')
      })
    )(collection)
  }
  return collection
}
