import { deleteNft } from '@echo/firestore/crud/nft/delete-nft'
import { getNftSnapshot } from '@echo/firestore/crud/nft/get-nft'
import { getNftsForWalletPaginated } from '@echo/firestore/crud/nft/get-nfts-for-wallet'
import type { QueryDocumentSnapshot } from '@echo/firestore/types/query-document-snapshot'
import { mapNftToNftIndex } from '@echo/model/helpers/nft/map-nft-to-nft-index'
import type { Nft } from '@echo/model/types/nft'
import type { NftIndex } from '@echo/model/types/nft-index'
import type { Wallet } from '@echo/model/types/wallet'
import { PROMISE_POOL_CONCURRENCY } from '@echo/tasks/constants/promise-pool-concurrency'
import { throwError } from '@echo/utils/fp/throw-error'
import { errorMessage } from '@echo/utils/helpers/error-message'
import type { LoggerInterface } from '@echo/utils/types/logger-interface'
import type { Nullable } from '@echo/utils/types/nullable'
import { PromisePool } from '@supercharge/promise-pool'
import { andThen, ifElse, inc, isNil, pipe, prop } from 'ramda'

async function removeNftsForWalletForPage<T extends Wallet>(page: number, wallet: T, logger?: LoggerInterface) {
  const { result: nfts, hasNext } = await getNftsForWalletPaginated({ page, wallet })
  await PromisePool.withConcurrency(PROMISE_POOL_CONCURRENCY)
    .for(nfts)
    .process(async (nft) => {
      try {
        const nftId = await pipe<[Nft], NftIndex, Promise<Nullable<QueryDocumentSnapshot<Nft>>>, Promise<string>>(
          mapNftToNftIndex,
          getNftSnapshot,
          andThen(ifElse(isNil, throwError('Snapshot is nil'), prop('id')))
        )(nft)
        await deleteNft(nftId)
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
