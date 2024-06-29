import type { Wallet } from '@echo/model/types/wallet'
import { getNftsByAccount as getNftsFromNftScan } from '@echo/nft-scan/services/get-nfts-by-account'
import type { PartialNft } from '@echo/nft-scan/types/partial-nft'
import { getNftsByAccount as getNftsFromOpensea } from '@echo/opensea/services/get-nfts-by-account'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { isTestnetChain } from '@echo/utils/helpers/chains/is-testnet-chain'
import type { WithFetch } from '@echo/utils/types/with-fetch'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { andThen, collectBy, otherwise, path, pipe } from 'ramda'

interface FetchNftsArgs<T extends Wallet> extends WithFetch {
  wallet: T
}

export function fetchNfts<T extends Wallet>(args: WithLoggerType<FetchNftsArgs<T>>): Promise<PartialNft[][]> {
  const { wallet, logger } = args
  const fetcher = isTestnetChain(wallet.chain) ? getNftsFromOpensea : getNftsFromNftScan
  return pipe(
    fetcher,
    andThen(collectBy(nonNullableReturn<[PartialNft], string>(path(['collection', 'contract', 'address'])))),
    otherwise((err) => {
      logger?.error({ err, wallet }, 'error fetching NFTs')
      return []
    })
  )(args)
}
