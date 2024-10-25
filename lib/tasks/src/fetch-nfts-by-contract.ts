import { isTestnetChain } from '@echo/model/helpers/chain/is-testnet-chain'
import type { Contract } from '@echo/model/types/contract'
import { getNftsByContract as getNftsFromNftScan } from '@echo/nft-scan/services/get-nfts-by-contract'
import type { PartialNft } from '@echo/nft-scan/types/partial-nft'
import { getNftsByContract as getNftsFromOpensea } from '@echo/opensea/services/get-nfts-by-contract'
import { error } from '@echo/tasks/helpers/logger'
import { objOf, otherwise, pipe } from 'ramda'

/**
 * Fetches NFTs from the API and groups them by collection
 * We use OpenSea API on testnet and NFTScan on mainnet
 * @param contract
 */
export function fetchNftsByContract(contract: Contract): Promise<PartialNft[]> {
  const fetcher = isTestnetChain(contract.chain) ? getNftsFromOpensea : getNftsFromNftScan
  return pipe(
    objOf('contract'),
    fetcher,
    otherwise((err) => {
      error({ err, contract }, 'could not fetch NFTs by contract from API')
      return []
    })
  )(contract)
}
