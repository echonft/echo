import type { Wallet } from '@echo/model/types/wallet'
import { getNftsByAccount as getNftsFromNftScan } from '@echo/nft-scan/services/get-nfts-by-account'
import type { PartialNft } from '@echo/nft-scan/types/partial-nft'
import { getNftsByAccount as getNftsFromOpensea } from '@echo/opensea/services/get-nfts-by-account'
import { isTestnetChain } from '@echo/utils/helpers/chains/is-testnet-chain'
import type { WithFetch } from '@echo/utils/types/with-fetch'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { andThen, collectBy, otherwise, path, pipe } from 'ramda'

interface FetchNftsByAccountArgs extends WithFetch {
  wallet: Wallet
}

/**
 * Fetches NFTs from the API and groups them by collection
 * We use OpenSea API on testnet and NFTScan on mainnet
 * @param args
 */
export function fetchNftsByAccount(args: WithLoggerType<FetchNftsByAccountArgs>): Promise<PartialNft[][]> {
  const { wallet } = args
  const fetcher = isTestnetChain(wallet.chain) ? getNftsFromOpensea : getNftsFromNftScan
  return pipe(
    fetcher,
    andThen(collectBy(path(['collection', 'contract', 'address']))),
    otherwise((err) => {
      args.logger?.error({ err, wallet }, 'could not fetch NFTs by account from API')
      return []
    })
  )(args)
}
