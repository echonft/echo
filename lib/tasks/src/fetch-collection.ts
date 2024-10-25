import { isTestnetChain } from '@echo/model/helpers/chain/is-testnet-chain'
import type { Collection } from '@echo/model/types/collection'
import type { Contract } from '@echo/model/types/contract'
import { getCollectionByAddress as getCollectionFromNftScan } from '@echo/nft-scan/services/get-collection-by-address'
import { getCollectionByAddress as getCollectionFromOpenSea } from '@echo/opensea/services/get-collection-by-address'
import { error, info } from '@echo/tasks/helpers/logger'
import type { Nullable } from '@echo/utils/types/nullable'
import { objOf, otherwise, pipe } from 'ramda'

/**
 * Fetches a collection from the API
 * We use OpenSea API on testnet and NFTScan on mainnet
 * @param contract
 */
export function fetchCollection(contract: Contract): Promise<Nullable<Collection>> {
  const fetcher = isTestnetChain(contract.chain)
    ? getCollectionFromOpenSea
    : pipe(objOf('contract'), getCollectionFromNftScan)
  info({ collection: { contract }, fetcher: fetchCollection.name }, 'fetching collection')
  return pipe(
    fetcher,
    otherwise((err) => {
      error({ err, collection: { contract } }, 'could not fetch collection from API')
      return undefined
    })
  )(contract)
}
