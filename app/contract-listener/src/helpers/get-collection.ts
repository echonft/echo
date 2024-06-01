import { addCollection } from '@echo/firestore/crud/collection/add-collection'
import { getCollectionByAddress as getCollectionByAddressFromFirestore } from '@echo/firestore/crud/collection/get-collection-by-address'
import type { Collection } from '@echo/model/types/collection'
import { getCollectionByAddress as getCollectionByAddressFromNftScan } from '@echo/nft-scan/services/get-collection-by-address'
import type { GetContractRequest } from '@echo/opensea/types/request/get-contract-request'
import { pinoLogger } from '@echo/utils/services/pino-logger'
import { andThen, assoc, isNil, pipe, prop, tap } from 'ramda'

/**
 * Returns the collection for a given NFT.
 * Adds the collection if it does not exist already.
 *
 * @param {Omit<GetContractRequest, 'fetch'>} args
 * @return {Promise<Collection>} - The existing or newly created collection.
 */
export async function getCollection(args: Omit<GetContractRequest, 'fetch'>): Promise<Collection> {
  const collection = await getCollectionByAddressFromFirestore(args)
  // Collection is new, need to fetch it and then add it
  if (isNil(collection)) {
    pinoLogger.info(`Collection ${args.address} not found, fetching...`)
    // TODO Clean this
    // TODO Need to add testnet
    const fetchedCollection = await pipe(
      assoc('fetch', fetch),
      getCollectionByAddressFromNftScan
    )({ contract: { address: args.address, chain: args.chain } })

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
