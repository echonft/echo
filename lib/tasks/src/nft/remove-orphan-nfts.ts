import { deleteNft } from '@echo/firestore/crud/nft/delete-nft'
import { getNftsPaginated } from '@echo/firestore/crud/nft/get-nfts-paginated'
import { findWalletByAddress } from '@echo/firestore/crud/wallet/find-wallet-by-address'
import { PROMISE_POOL_CONCURRENCY } from '@echo/tasks/constants/promise-pool-concurrency'
import { errorMessage } from '@echo/utils/helpers/error-message'
import type { LoggerInterface } from '@echo/utils/types/logger-interface'
import { getNftOwner } from '@echo/web3/helpers/nft/get-nft-owner'
import { PromisePool } from '@supercharge/promise-pool'
import { inc, isNil } from 'ramda'

async function removeOrphanNftsForPage(page: number, logger?: LoggerInterface) {
  const { result: nfts, hasNext } = await getNftsPaginated({ page })
  await PromisePool.withConcurrency(PROMISE_POOL_CONCURRENCY)
    .for(nfts)
    .process(async (nft) => {
      try {
        const ownerWallet = await getNftOwner(nft)
        try {
          const foundWallet = await findWalletByAddress(ownerWallet)
          if (isNil(foundWallet)) {
            logger?.warn(
              `NFT ${nft.collection.slug} #${nft.tokenId} is not owned by any user in the database, deleting...`
            )
            try {
              await deleteNft(nft.id)
              logger?.info(`NFT ${nft.collection.slug} #${nft.tokenId} deleted`)
            } catch (e) {
              logger?.error(`error deleting NFT ${nft.collection.slug} #${nft.tokenId}: ${errorMessage(e)}`)
            }
          }
        } catch (e) {
          logger?.error(`error finding wallet ${JSON.stringify(ownerWallet)}: ${errorMessage(e)}`)
        }
      } catch (e) {
        logger?.error(`error getting owner for NFT ${nft.collection.slug} #${nft.tokenId}: ${errorMessage(e)}`)
      }
    })
  if (hasNext) {
    return await removeOrphanNftsForPage(inc(page), logger)
  }
}

export function removeOrphanNfts(logger?: LoggerInterface) {
  return removeOrphanNftsForPage(0, logger)
}
