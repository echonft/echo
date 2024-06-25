import { addCollection } from '@echo/firestore/crud/collection/add-collection'
import { getCollectionByAddress as getCollectionByAddressFromFirestore } from '@echo/firestore/crud/collection/get-collection-by-address'
import type { Collection } from '@echo/model/types/collection'
import type { Wallet } from '@echo/model/types/wallet'
import { fetchCollection } from '@echo/tasks/fetch-collection'
import { unlessNil } from '@echo/utils/fp/unless-nil'
import type { Nullable } from '@echo/utils/types/nullable'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { andThen, assoc, isNil, pipe, prop, tap } from 'ramda'

/**
 * Returns the collection for a given NFT. Will decide where to fetch the data based on chain
 * We use OpenSea API on testnet and NFTScan on mainnet
 * Adds the collection if it does not exist already.
 */
export async function updateCollection(
  args: WithLoggerType<Record<'contract', Wallet>>
): Promise<Nullable<Omit<Collection, 'swapsCount'>>> {
  const logger = args.logger?.child({ fn: updateCollection.name, collection: { contract: args.contract } })
  logger?.info('getting collection')
  const collection = await getCollectionByAddressFromFirestore(args.contract)
  // Collection is new, need to fetch it and then add it
  if (isNil(collection)) {
    return pipe(
      fetchCollection,
      andThen(
        unlessNil(
          pipe(
            assoc('verified', false),
            addCollection,
            andThen(
              pipe(
                tap(({ id, data }) => {
                  args.logger?.warn(
                    { collection: assoc('id', id, data), fn: updateCollection.name },
                    'added collection'
                  )
                }),
                prop('data')
              )
            )
          )
        )
      )
    )(args)
  }
  return collection
}
