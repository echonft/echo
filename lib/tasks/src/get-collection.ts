import { getCollectionByAddress as getCollectionByAddressFromFirestore } from '@echo/firestore/crud/collection/get-collection-by-address'
import type { Collection } from '@echo/model/types/collection'
import type { Wallet } from '@echo/model/types/wallet'
import { fetchCollection } from '@echo/tasks/fetch-collection'
import type { Nullable } from '@echo/utils/types/nullable'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { always, andThen, assoc, isNil, objOf, otherwise, pipe } from 'ramda'

interface GetCollectionReturn {
  collection: Nullable<Omit<Collection, 'swapsCount'>>
  source: 'firestore' | 'api'
}

export async function getCollection(args: WithLoggerType<Record<'contract', Wallet>>): Promise<GetCollectionReturn> {
  const logger = args.logger?.child({ fn: getCollection.name })
  logger?.info({ collection: { contract: args.contract } }, 'getting collection')
  const collection = await pipe(getCollectionByAddressFromFirestore, otherwise(always(undefined)))(args.contract)
  if (isNil(collection)) {
    return pipe(
      fetchCollection,
      andThen(
        pipe<[Nullable<Omit<Collection, 'swapsCount'>>], Omit<GetCollectionReturn, 'source'>, GetCollectionReturn>(
          objOf('collection'),
          assoc('source', 'api')
        )
      ),
      otherwise(
        always({
          collection: undefined,
          source: 'api'
        })
      )
    )(args)
  }
  return { collection, source: 'firestore' }
}
