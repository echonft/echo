import type { Nft } from '@echo/model/types/nft'
import type { Wallet } from '@echo/model/types/wallet'
import { getNft as getNftFromNftScan } from '@echo/nft-scan/services/get-nft'
import { getNft as getNftFromOpenSea } from '@echo/opensea/services/get-nft'
import { isTestnetChain } from '@echo/utils/helpers/chains/is-testnet-chain'
import type { Nullable } from '@echo/utils/types/nullable'
import type { WithFetch } from '@echo/utils/types/with-fetch'
import type { WithLoggerType } from '@echo/utils/types/with-logger'

interface FetchNftArgs extends WithFetch {
  contract: Wallet
  identifier: string
}

export async function fetchNft(
  args: WithLoggerType<FetchNftArgs>
): Promise<Nullable<Omit<Nft, 'collection' | 'owner' | 'updatedAt'>>> {
  const fetcher = isTestnetChain(args.contract.chain) ? getNftFromOpenSea : getNftFromNftScan
  args.logger?.info(
    { nft: { collection: { contract: args.contract }, tokenId: args.identifier }, fn: fetchNft.name },
    'fetching NFT'
  )
  return fetcher(args)
}
