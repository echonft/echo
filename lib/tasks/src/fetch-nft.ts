import type { Wallet } from '@echo/model/types/wallet'
import { getNft as getNftFromNftScan } from '@echo/nft-scan/services/get-nft'
import type { PartialNft } from '@echo/nft-scan/types/partial-nft'
import { getNft as getNftFromOpenSea } from '@echo/opensea/services/get-nft'
import { isTestnetChain } from '@echo/utils/helpers/chains/is-testnet-chain'
import type { Nullable } from '@echo/utils/types/nullable'
import type { WithFetch } from '@echo/utils/types/with-fetch'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { otherwise, pipe } from 'ramda'

interface FetchNftArgs extends WithFetch {
  contract: Wallet
  identifier: string
}

/**
 * Fetches an NFT from the API
 * We use OpenSea API on testnet and NFTScan on mainnet
 * @param args
 */
export async function fetchNft(args: WithLoggerType<FetchNftArgs>): Promise<Nullable<PartialNft>> {
  const fetcher = isTestnetChain(args.contract.chain) ? getNftFromOpenSea : getNftFromNftScan
  args.logger?.info({ nft: { collection: { contract: args.contract }, tokenId: args.identifier } }, 'fetching NFT')
  return pipe(
    fetcher,
    otherwise((err) => {
      args.logger?.error(
        { err, nft: { collection: { contract: args.contract }, tokenId: args.identifier } },
        'could not fetch NFT from API'
      )
      return undefined
    })
  )(args)
}
