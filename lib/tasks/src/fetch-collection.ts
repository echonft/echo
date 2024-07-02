import type { PartialWallet } from '@echo/firestore/types/model/wallet/wallet-document-data'
import type { Collection } from '@echo/model/types/collection'
import { getCollectionByAddress as getCollectionFromNftScan } from '@echo/nft-scan/services/get-collection-by-address'
import { getCollectionByAddress as getCollectionFromOpenSea } from '@echo/opensea/services/get-collection-by-address'
import { isTestnetChain } from '@echo/utils/helpers/chains/is-testnet-chain'
import type { Nullable } from '@echo/utils/types/nullable'
import type { WithFetch } from '@echo/utils/types/with-fetch'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { assoc } from 'ramda'

interface FetchCollectionArgs extends WithFetch {
  contract: PartialWallet
}

/**
 * Returns the collection for a given NFT. Will decide where to fetch the data based on chain
 * We use OpenSea API on testnet and NFTScan on mainnet
 * Adds the collection if it does not exist already.
 */
export function fetchCollection(args: WithLoggerType<FetchCollectionArgs>): Promise<Nullable<Collection>> {
  const logger = args.logger?.child({ fn: fetchCollection.name })
  const fetcher = isTestnetChain(args.contract.chain) ? getCollectionFromOpenSea : getCollectionFromNftScan
  logger?.info({ collection: { contract: args.contract }, fn: fetchCollection.name }, 'fetching collection')
  return fetcher(assoc('logger', logger, args))
}
