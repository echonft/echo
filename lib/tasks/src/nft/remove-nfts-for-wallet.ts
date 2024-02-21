import { deleteNft } from '@echo/firestore/crud/nft/delete-nft'
import { getNftsForWalletPaginated } from '@echo/firestore/crud/nft/get-nfts-for-wallet'
import type { Wallet } from '@echo/model/types/wallet'
import { PROMISE_POOL_CONCURRENCY } from '@echo/tasks/constants/promise-pool-concurrency'
import { errorMessage } from '@echo/utils/helpers/error-message'
import type { LoggerInterface } from '@echo/utils/types/logger-interface'
import { PromisePool } from '@supercharge/promise-pool'
import { inc } from 'ramda'

async function removeNftsForWalletForPage<T extends Wallet>(page: number, wallet: T, logger?: LoggerInterface) {
  const { result: nfts, hasNext } = await getNftsForWalletPaginated({ page, wallet })
  await PromisePool.withConcurrency(PROMISE_POOL_CONCURRENCY)
    .for(nfts)
    .process(async (nft) => {
      try {
        await deleteNft(nft.id)
      } catch (e) {
        logger?.error(`error deleting NFT ${nft.collection.slug} #${nft.tokenId}: ${errorMessage(e)}`)
      }
    })
  if (hasNext) {
    return await removeNftsForWalletForPage(inc(page), wallet, logger)
  }
}

export function removeNftsForWallet<T extends Wallet>(wallet: T, logger?: LoggerInterface) {
  return removeNftsForWalletForPage(0, wallet, logger)
}
