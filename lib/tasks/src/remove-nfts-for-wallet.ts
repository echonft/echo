import { deleteNft } from '@echo/firestore/crud/nft/delete-nft'
import { getNftSnapshot } from '@echo/firestore/crud/nft/get-nft'
import { getNftsForWallet } from '@echo/firestore/crud/nft/get-nfts-for-wallet'
import type { PartialWallet } from '@echo/firestore/types/model/wallet/wallet-document-data'
import type { Nft } from '@echo/model/types/nft'
import { unlessNil } from '@echo/utils/fp/unless-nil'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { andThen, dissoc, otherwise, pipe, prop } from 'ramda'

// TODO remove for all EVM chains
export async function removeNftsForWallet(args: WithLoggerType<Record<'wallet', PartialWallet>>): Promise<void> {
  const logger = args.logger?.child({ fn: removeNftsForWallet.name })
  const nfts = await pipe<
    [WithLoggerType<Record<'wallet', PartialWallet>>],
    Record<'wallet', PartialWallet>,
    Promise<Nft[]>,
    Promise<Nft[]>
  >(
    dissoc('logger'),
    getNftsForWallet,
    otherwise((err: unknown) => {
      logger?.error({ err, wallet: args.wallet }, 'could not get NFTs for wallet')
      return []
    })
  )(args)
  for (const nft of nfts) {
    await pipe(
      getNftSnapshot,
      otherwise((err: unknown) => {
        logger?.error({ err, nft }, 'could not get NFT snapshot')
      }),
      andThen(
        unlessNil(
          pipe(
            prop('id'),
            deleteNft,
            otherwise((err: unknown) => {
              logger?.error({ err, nft }, 'could not delete NFT')
            }),
            andThen(() => {
              logger?.info({ nft }, 'deleted NFT')
            })
          )
        )
      )
    )(nft)
  }
}
