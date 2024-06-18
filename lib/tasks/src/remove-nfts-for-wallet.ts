import { deleteNft } from '@echo/firestore/crud/nft/delete-nft'
import { getNftSnapshot } from '@echo/firestore/crud/nft/get-nft'
import { getNftsForWalletPaginated } from '@echo/firestore/crud/nft/get-nfts-for-wallet'
import type { QueryDocumentSnapshot } from '@echo/firestore/types/query-document-snapshot'
import { getNftIndex } from '@echo/model/helpers/nft/get-nft-index'
import type { Nft } from '@echo/model/types/nft'
import type { NftIndex } from '@echo/model/types/nft-index'
import type { Wallet } from '@echo/model/types/wallet'
import { throwError } from '@echo/utils/fp/throw-error'
import type { Nullable } from '@echo/utils/types/nullable'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { andThen, assoc, dissoc, ifElse, inc, isNil, modify, pipe, prop } from 'ramda'

async function removeNftsForWalletForPage<T extends Wallet>(
  args: WithLoggerType<{
    page: number
    wallet: T
  }>
): Promise<void> {
  const { result: nfts, hasNext } = await getNftsForWalletPaginated(dissoc('logger', args))
  for (const nft of nfts) {
    try {
      const nftId = await pipe<[Nft], NftIndex, Promise<Nullable<QueryDocumentSnapshot<Nft>>>, Promise<string>>(
        getNftIndex,
        getNftSnapshot,
        andThen(ifElse(isNil, throwError('Snapshot is nil'), prop('id')))
      )(nft)
      await deleteNft(nftId)
    } catch (err) {
      args.logger?.error({ err, nft }, 'error deleting NFT')
    }
  }
  if (hasNext) {
    return pipe<
      [WithLoggerType<{ page: number; wallet: T }>],
      WithLoggerType<{
        page: number
        wallet: T
      }>,
      Promise<void>
    >(
      modify('page', inc),
      removeNftsForWalletForPage
    )(args)
  }
}

// TODO remove for all EVM chains
export function removeNftsForWallet<T extends Wallet>(args: WithLoggerType<Record<'wallet', T>>) {
  return pipe<[WithLoggerType<Record<'wallet', T>>], WithLoggerType<{ page: number; wallet: T }>, Promise<void>>(
    assoc('page', 0),
    removeNftsForWalletForPage
  )(args)
}
