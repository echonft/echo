import { getCollectionByAddress as getCollectionByAddressFromFirestore } from '@echo/firestore/crud/collection/get-collection-by-address'
import type { PartialWallet } from '@echo/firestore/types/model/wallet/wallet-document-data'
import type { Collection } from '@echo/model/types/collection'
import { fetchCollection } from '@echo/tasks/fetch-collection'
import type { Nullable } from '@echo/utils/types/nullable'
import type { WithFetch } from '@echo/utils/types/with-fetch'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { always, andThen, assoc, ifElse, isNil, objOf, otherwise, pipe } from 'ramda'

interface GetCollectionReturn {
  collection: Nullable<Collection>
  source: 'firestore' | 'api'
}

interface GetCollectionArgs extends WithFetch {
  contract: PartialWallet
}

export async function getCollection(args: WithLoggerType<GetCollectionArgs>): Promise<GetCollectionReturn> {
  const logger = args.logger?.child({ fn: getCollection.name })
  logger?.info({ collection: { contract: args.contract } }, 'getting collection')
  const collection = await pipe(getCollectionByAddressFromFirestore, otherwise(always(undefined)))(args.contract)
  if (isNil(collection)) {
    return pipe(
      fetchCollection,
      andThen(
        ifElse(
          isNil<Nullable<Collection>>,
          always<GetCollectionReturn>({
            collection: undefined,
            source: 'api'
          }),
          pipe<[Collection], Omit<GetCollectionReturn, 'source'>, GetCollectionReturn>(
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
