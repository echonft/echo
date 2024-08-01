import { deleteNft } from '@echo/firestore/crud/nft/delete-nft'

import { getNftSnapshot } from '@echo/firestore/crud/nft/get-nft-snapshot'
import { getNftsForWallet } from '@echo/firestore/crud/nft/get-nfts-for-wallet'
import type { Nft } from '@echo/model/types/nft'
import type { Wallet } from '@echo/model/types/wallet'
import { unlessNil } from '@echo/utils/fp/unless-nil'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { andThen, dissoc, otherwise, pipe, prop } from 'ramda'

/**
 * Removes the NFTs associated to a given wallet
 * TODO remove for all EVM chains
 * @param args
 */
export async function removeNftsForWallet(args: WithLoggerType<Record<'wallet', Wallet>>): Promise<void> {
  const nfts = await pipe<
    [WithLoggerType<Record<'wallet', Wallet>>],
    Record<'wallet', Wallet>,
    Promise<Nft[]>,
    Promise<Nft[]>
  >(
    dissoc('logger'),
    getNftsForWallet,
    otherwise((err: unknown) => {
      args.logger?.error({ err, wallet: args.wallet }, 'could not get NFTs for wallet')
      return []
    })
  )(args)
  for (const nft of nfts) {
    await pipe(
      getNftSnapshot,
      otherwise((err: unknown) => {
        args.logger?.error({ err, nft }, 'could not get NFT snapshot')
      }),
      andThen(
        unlessNil(
          pipe(
            prop('id'),
            deleteNft,
            otherwise((err: unknown) => {
              args.logger?.error({ err, nft }, 'could not delete NFT')
            }),
            andThen(() => {
              args.logger?.info({ nft }, 'deleted NFT')
            })
          )
        )
      )
    )(nft)
  }
}
