import { getCollectionByAddress as getCollectionByAddressFromFirestore } from '@echo/firestore/crud/collection/get-collection-by-address'
import type { Collection } from '@echo/model/types/collection'
import type { Wallet } from '@echo/model/types/wallet'
import { fetchCollection } from '@echo/tasks/fetch-collection'
import type { Nullable } from '@echo/utils/types/nullable'
import type { WithFetch } from '@echo/utils/types/with-fetch'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { always, andThen, assoc, ifElse, isNil, objOf, otherwise, pipe } from 'ramda'

interface GetCollectionReturn {
  collection: Nullable<Collection>
  source: 'firestore' | 'api'
}

interface GetCollectionArgs<T extends Wallet> extends WithFetch {
  contract: T
}

export async function getCollection<T extends Wallet>(
  args: WithLoggerType<GetCollectionArgs<T>>
): Promise<GetCollectionReturn> {
  const logger = args.logger?.child({ fn: getCollection.name })
  logger?.info({ collection: { contract: args.contract } }, 'getting collection')
  const collection = await pipe(getCollectionByAddressFromFirestore, otherwise(always(undefined)))(args.contract)
  if (isNil(collection)) {
    return pipe(
      fetchCollection,
      andThen(
        ifElse(
          isNil<Nullable<Omit<Collection, 'swapsCount'>>>,
          always<GetCollectionReturn>({
            collection: undefined,
            source: 'api'
          }),
          pipe<[Omit<Collection, 'swapsCount'>], Collection, Omit<GetCollectionReturn, 'source'>, GetCollectionReturn>(
            assoc('swapsCount', 0),
            objOf('collection'),
            assoc('source', 'api')
          )
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
