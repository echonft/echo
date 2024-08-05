import type { Wallet } from '@echo/model/types/wallet'
import { getNftsByContract as getNftsFromNftScan } from '@echo/nft-scan/services/get-nfts-by-contract'
import type { PartialNft } from '@echo/nft-scan/types/partial-nft'
import { getNftsByContract as getNftsFromOpensea } from '@echo/opensea/services/get-nfts-by-contract'
import { isTestnetChain } from '@echo/utils/helpers/chains/is-testnet-chain'
import type { WithFetch } from '@echo/utils/types/with-fetch'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { otherwise, pipe } from 'ramda'

export interface FetchNftsByContractArgs extends WithFetch {
  contract: Wallet
}

/**
 * Fetches NFTs from the API and groups them by collection
 * We use OpenSea API on testnet and NFTScan on mainnet
 * @param args
 */
export function fetchNftsByContract(args: WithLoggerType<FetchNftsByContractArgs>): Promise<PartialNft[]> {
  const { contract } = args
  const fetcher = isTestnetChain(contract.chain) ? getNftsFromOpensea : getNftsFromNftScan
  return pipe(
    fetcher,
    otherwise((err) => {
      args.logger?.error({ err, contract }, 'could not fetch NFTs by contract from API')
      return []
    })
  )(args)
}
