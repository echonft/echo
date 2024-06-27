import type { Collection } from '@echo/model/types/collection'
import type { Nft } from '@echo/model/types/nft'
import type { Wallet } from '@echo/model/types/wallet'
import { getNftsByAccount as getNftsFromNftScan } from '@echo/nft-scan/services/get-nfts-by-account'
import { getNftsByAccount as getNftsFromOpensea } from '@echo/opensea/services/get-nfts-by-account'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { isTestnetChain } from '@echo/utils/helpers/chains/is-testnet-chain'
import type { WithFetch } from '@echo/utils/types/with-fetch'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { always, andThen, collectBy, otherwise, path, pipe } from 'ramda'

type PartialNft = Omit<Nft, 'collection' | 'owner' | 'updatedAt'> & {
  collection: Pick<Collection, 'contract'>
}

interface FetchNftsForWalletArgs<T extends Wallet> extends WithFetch {
  wallet: T
}

export async function fetchNftsForWallet<T extends Wallet>(args: WithLoggerType<FetchNftsForWalletArgs<T>>) {
  const { wallet, logger } = args
  try {
    const fetcher = isTestnetChain(wallet.chain) ? getNftsFromOpensea : getNftsFromNftScan
    return pipe(
      fetcher,
      andThen(collectBy(nonNullableReturn<[PartialNft], string>(path(['collection', 'contract', 'address'])))),
      otherwise(always(undefined))
    )(args)
  } catch (err) {
    logger?.error({ err, wallet }, 'error fetching NFTs')
    return undefined
  }
}
