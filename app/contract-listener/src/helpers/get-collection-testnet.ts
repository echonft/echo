import { addCollection } from '@echo/firestore/crud/collection/add-collection'
import { getCollectionByAddress as getCollectionByAddressFromFirestore } from '@echo/firestore/crud/collection/get-collection-by-address'
import type { Collection } from '@echo/model/types/collection'
import { getCollectionByAddress as getCollectionByAddressFromOpenSea } from '@echo/opensea/services/get-collection-by-address'
import type { GetContractRequest } from '@echo/opensea/types/request/get-contract-request'
import { pinoLogger } from '@echo/utils/services/pino-logger'
import { andThen, assoc, isNil, pipe, prop, tap } from 'ramda'

/**
 * TESTNET ONLY
 * This method uses OpenSea which doesn't work well on mainnet
 */
export async function getCollectionTestnet(args: Omit<GetContractRequest, 'fetch'>): Promise<Collection> {
  const collection = await getCollectionByAddressFromFirestore(args)
  // Collection is new, need to fetch it and then add it
  if (isNil(collection)) {
    pinoLogger.info(`Collection ${args.address} not found, fetching...`)
    const fetchedCollection = await pipe(assoc('fetch', fetch), getCollectionByAddressFromOpenSea)(args)
    return pipe(
      assoc('verified', false),
      addCollection,
      andThen(
        pipe(
          prop('data'),
          tap((collection) => {
            pinoLogger.info(`Added collection ${collection.slug}`)
          })
        )
      )
    )(fetchedCollection)
  }
  return collection
}
