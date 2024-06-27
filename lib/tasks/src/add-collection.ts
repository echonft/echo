import { addCollection as addCollectionToFirestore } from '@echo/firestore/crud/collection/add-collection'
import type { Collection } from '@echo/model/types/collection'
import type { Wallet } from '@echo/model/types/wallet'
import { getCollection } from '@echo/tasks/get-collection'
import type { Nullable } from '@echo/utils/types/nullable'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { andThen, assoc, isNil, otherwise, pipe } from 'ramda'

/**
 * Adds the collection associated to a given contract if it does not exist already
 */
export async function addCollection(
  args: WithLoggerType<Record<'contract', Wallet>>
): Promise<Nullable<Omit<Collection, 'swapsCount'>>> {
  const { contract } = args
  const logger = args.logger?.child({ fn: addCollection.name })
  const { collection, source } = await getCollection({ contract, logger })
  if (source === 'api' && !isNil(collection)) {
    await pipe(
      addCollectionToFirestore,
      andThen(({ id, data }) => {
        args.logger?.info({ collection: assoc('id', id, data) }, 'added collection')
      }),
      otherwise((err) => {
        logger?.error({ err, collection: { contract } }, 'could not add collection')
      })
    )(collection)
  }
  return collection
}
