import { deleteNft } from '@echo/firestore/crud/nft/delete-nft'
import { getNftSnapshot } from '@echo/firestore/crud/nft/get-nft'
import { getNftsPaginated } from '@echo/firestore/crud/nft/get-nfts-paginated'
import { getWalletByAddress } from '@echo/firestore/crud/wallet/get-wallet-by-address'
import type { QueryDocumentSnapshot } from '@echo/firestore/types/query-document-snapshot'
import { getNftIndex } from '@echo/model/helpers/nft/get-nft-index'
import type { Nft } from '@echo/model/types/nft'
import type { NftIndex } from '@echo/model/types/nft-index'
import { PROMISE_POOL_CONCURRENCY } from '@echo/tasks/constants/promise-pool-concurrency'
import { throwError } from '@echo/utils/fp/throw-error'
import { errorMessage } from '@echo/utils/helpers/error-message'
import type { LoggerInterface } from '@echo/utils/types/logger-interface'
import type { Nullable } from '@echo/utils/types/nullable'
import { getNftOwner } from '@echo/web3/helpers/nft/get-nft-owner'
import { PromisePool } from '@supercharge/promise-pool'
import { andThen, ifElse, inc, isNil, pipe, prop } from 'ramda'

async function removeOrphanNftsForPage(page: number, logger?: LoggerInterface) {
  const { result: nfts, hasNext } = await getNftsPaginated({ page })
  await PromisePool.withConcurrency(PROMISE_POOL_CONCURRENCY)
    .for(nfts)
    .process(async (nft) => {
      try {
        const ownerWallet = await getNftOwner(nft)
        try {
          const foundWallet = await getWalletByAddress(ownerWallet)
          if (isNil(foundWallet)) {
            logger?.warn(
              `NFT ${nft.collection.slug} #${nft.tokenId} is not owned by any user in the database, deleting...`
            )
            try {
              const nftId = await pipe<[Nft], NftIndex, Promise<Nullable<QueryDocumentSnapshot<Nft>>>, Promise<string>>(
                getNftIndex,
                getNftSnapshot,
                andThen(ifElse(isNil, throwError('Snapshot is nil'), prop('id')))
              )(nft)
              await deleteNft(nftId)
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
