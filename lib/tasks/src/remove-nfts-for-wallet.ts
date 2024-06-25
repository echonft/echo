import { deleteNft } from '@echo/firestore/crud/nft/delete-nft'
import { getNftSnapshot } from '@echo/firestore/crud/nft/get-nft'
import { getNftsForWallet } from '@echo/firestore/crud/nft/get-nfts-for-wallet'
import type { QueryDocumentSnapshot } from '@echo/firestore/types/query-document-snapshot'
import { getNftIndex } from '@echo/model/helpers/nft/get-nft-index'
import type { Nft } from '@echo/model/types/nft'
import type { NftIndex } from '@echo/model/types/nft-index'
import type { Wallet } from '@echo/model/types/wallet'
import { throwError } from '@echo/utils/fp/throw-error'
import type { Nullable } from '@echo/utils/types/nullable'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { andThen, dissoc, ifElse, isNil, pipe, prop } from 'ramda'

// TODO remove for all EVM chains
export async function removeNftsForWallet<T extends Wallet>(args: WithLoggerType<Record<'wallet', T>>) {
  const nfts = await getNftsForWallet(dissoc('logger', args))
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
}
