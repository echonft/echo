import { addCollection } from '@echo/firestore/crud/collection/add-collection'
import { getCollectionByAddress as getCollectionByAddressFromFirestore } from '@echo/firestore/crud/collection/get-collection-by-address'
import type { Collection } from '@echo/model/types/collection'
import type { Wallet } from '@echo/model/types/wallet'
import { getCollectionByAddress as getCollectionByAddressFromNftScan } from '@echo/nft-scan/services/get-collection-by-address'
import { getCollectionByAddress as getCollectionByAddressFromOpenSea } from '@echo/opensea/services/get-collection-by-address'
import { isTestnetChain } from '@echo/utils/helpers/chains/is-testnet-chain'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { andThen, assoc, isNil, pipe, prop, tap } from 'ramda'

/**
 * Returns the collection for a given NFT. Will decide where to fetch the data based on chain
 * We use OpenSea API on testnet and NFTScan on mainnet
 * Adds the collection if it does not exist already.
 */
export async function getCollection(args: WithLoggerType<Record<'contract', Wallet>>): Promise<Collection> {
  const fetcher = isTestnetChain(args.contract.chain)
    ? getCollectionByAddressFromOpenSea
    : getCollectionByAddressFromNftScan
  const collection = await getCollectionByAddressFromFirestore(args.contract)
  // Collection is new, need to fetch it and then add it
  if (isNil(collection)) {
    args.logger?.info({ collection, fn: 'getCollectionTestnet' }, 'collection not found, fetching...')
    const fetchedCollection = await pipe(assoc('fetch', fetch), fetcher)(args)
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
