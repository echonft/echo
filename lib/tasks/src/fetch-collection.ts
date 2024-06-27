import type { Collection } from '@echo/model/types/collection'
import type { Wallet } from '@echo/model/types/wallet'
import { getCollectionByAddress as getCollectionByAddressFromNftScan } from '@echo/nft-scan/services/get-collection-by-address'
import { getCollectionByAddress as getCollectionByAddressFromOpenSea } from '@echo/opensea/services/get-collection-by-address'
import { isTestnetChain } from '@echo/utils/helpers/chains/is-testnet-chain'
import type { Nullable } from '@echo/utils/types/nullable'
import type { WithFetch } from '@echo/utils/types/with-fetch'
import type { WithLoggerType } from '@echo/utils/types/with-logger'

interface FetchCollectionArgs<T extends Wallet> extends WithFetch {
  contract: T
}

/**
 * Returns the collection for a given NFT. Will decide where to fetch the data based on chain
 * We use OpenSea API on testnet and NFTScan on mainnet
 * Adds the collection if it does not exist already.
 */
export function fetchCollection<T extends Wallet>(
  args: WithLoggerType<FetchCollectionArgs<T>>
): Promise<Nullable<Omit<Collection, 'swapsCount'>>> {
  const fetcher = isTestnetChain(args.contract.chain)
    ? getCollectionByAddressFromOpenSea
    : getCollectionByAddressFromNftScan
  args.logger?.info({ collection: { contract: args.contract }, fn: fetchCollection.name }, 'fetching collection')
  return fetcher(args)
}
