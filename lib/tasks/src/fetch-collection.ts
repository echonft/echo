import type { PartialWallet } from '@echo/firestore/types/model/wallet/wallet-document-data'
import type { Collection } from '@echo/model/types/collection'
import { getCollectionByAddress as getCollectionFromNftScan } from '@echo/nft-scan/services/get-collection-by-address'
import { getCollectionByAddress as getCollectionFromOpenSea } from '@echo/opensea/services/get-collection-by-address'
import { isTestnetChain } from '@echo/utils/helpers/chains/is-testnet-chain'
import type { Nullable } from '@echo/utils/types/nullable'
import type { WithFetch } from '@echo/utils/types/with-fetch'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { otherwise, pipe } from 'ramda'

interface FetchCollectionArgs extends WithFetch {
  contract: PartialWallet
}

/**
 * Fetches a collection from the API
 * We use OpenSea API on testnet and NFTScan on mainnet
 * @param args
 */
export function fetchCollection(args: WithLoggerType<FetchCollectionArgs>): Promise<Nullable<Collection>> {
  const fetcher = isTestnetChain(args.contract.chain) ? getCollectionFromOpenSea : getCollectionFromNftScan
  args.logger?.info({ collection: { contract: args.contract }, fetcher: fetchCollection.name }, 'fetching collection')
  return pipe(
    fetcher,
    otherwise((err) => {
      args.logger?.error({ err, collection: { contract: args.contract } }, 'could not fetch collection from API')
      return undefined
    })
  )(args)
}
