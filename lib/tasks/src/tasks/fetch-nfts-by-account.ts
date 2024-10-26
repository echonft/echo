import { isTestnetChain } from '@echo/model/helpers/chain/is-testnet-chain'
import type { Contract } from '@echo/model/types/contract'
import { getNftsByAccount as getNftsFromNftScan } from '@echo/nft-scan/services/get-nfts-by-account'
import type { PartialNft } from '@echo/nft-scan/types/partial-nft'
import { getNftsByAccount as getNftsFromOpensea } from '@echo/opensea/services/get-nfts-by-account'
import { error } from '@echo/tasks/helpers/logger'
import { andThen, collectBy, objOf, otherwise, path, pipe } from 'ramda'

/**
 * Fetches NFTs from the API and groups them by collection
 * We use OpenSea API on testnet and NFTScan on mainnet
 * @param contract
 */
export function fetchNftsByAccount(contract: Contract): Promise<PartialNft[][]> {
  const fetcher = isTestnetChain(contract.chain) ? getNftsFromOpensea : getNftsFromNftScan
  return pipe(
    objOf('contract'),
    fetcher,
    andThen(collectBy(path(['collection', 'contract', 'address']))),
    otherwise((err) => {
      error({ err, contract }, 'could not fetch NFTs by account from API')
      return []
    })
  )(contract)
}
