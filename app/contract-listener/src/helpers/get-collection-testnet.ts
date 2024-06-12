import { addCollection } from '@echo/firestore/crud/collection/add-collection'
import { getCollectionByAddress as getCollectionByAddressFromFirestore } from '@echo/firestore/crud/collection/get-collection-by-address'
import type { Collection } from '@echo/model/types/collection'
import { getCollectionByAddress as getCollectionByAddressFromOpenSea } from '@echo/opensea/services/get-collection-by-address'
import type { GetContractRequest } from '@echo/opensea/types/request/get-contract-request'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { andThen, assoc, isNil, pipe, prop, tap } from 'ramda'

/**
 * TESTNET ONLY
 * This method uses OpenSea which doesn't work well on mainnet
 */
export async function getCollectionTestnet(
  args: WithLoggerType<Omit<GetContractRequest, 'fetch'>>
): Promise<Collection> {
  const collection = await getCollectionByAddressFromFirestore(args)
  // Collection is new, need to fetch it and then add it
  if (isNil(collection)) {
    args.logger?.info({ collection, fn: 'getCollectionTestnet' }, 'collection not found, fetching...')
    const fetchedCollection = await pipe(assoc('fetch', fetch), getCollectionByAddressFromOpenSea)(args)
    return pipe(
      assoc('verified', false),
      addCollection,
      andThen(
        pipe(
          tap(({ id, data }) => {
            args.logger?.info({ collection: assoc('id', id, data), fn: 'getCollectionTestnet' }, 'added collection')
          }),
          prop('data')
        )
      )
    )(fetchedCollection)
  }
  return collection
}
