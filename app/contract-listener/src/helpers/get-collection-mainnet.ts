import { loggers } from '@echo/contract-listener/index'
import { addCollection } from '@echo/firestore/crud/collection/add-collection'
import { getCollectionByAddress as getCollectionByAddressFromFirestore } from '@echo/firestore/crud/collection/get-collection-by-address'
import type { Collection } from '@echo/model/types/collection'
import { getCollectionByAddress as getCollectionByAddressFromNftScan } from '@echo/nft-scan/services/get-collection-by-address'
import type { GetContractRequest } from '@echo/opensea/types/request/get-contract-request'
import { andThen, assoc, isNil, pipe, prop, tap } from 'ramda'

export async function getCollectionMainnet(args: Omit<GetContractRequest, 'fetch'>): Promise<Collection> {
  const logger = loggers.get(args.chain)
  const fn = 'getCollectionMainnet'
  const collection = await getCollectionByAddressFromFirestore(args)
  // Collection is new, need to fetch it and then add it
  if (isNil(collection)) {
    logger?.info({ collection, fn }, 'collection not found, fetching...')
    const fetchedCollection = await pipe(
      assoc('fetch', fetch),
      getCollectionByAddressFromNftScan
    )({ contract: { address: args.address, chain: args.chain } })

    return pipe(
      assoc('verified', false),
      addCollection,
      andThen(
        pipe(
          tap(({ id, data }) => {
            logger?.info({ collection: assoc('id', id, data), fn }, 'added collection')
          }),
          prop('data')
        )
      )
    )(fetchedCollection)
  }
  return collection
}
