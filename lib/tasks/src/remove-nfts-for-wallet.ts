import { deleteNft } from '@echo/firestore/crud/nft/delete-nft'
import { getNftSnapshot } from '@echo/firestore/crud/nft/get-nft'
import { getNftsForWallet } from '@echo/firestore/crud/nft/get-nfts-for-wallet'
import type { PartialWallet } from '@echo/firestore/types/model/wallet/wallet-document-data'
import { unlessNil } from '@echo/utils/fp/unless-nil'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { andThen, dissoc, otherwise, pipe, prop } from 'ramda'

// TODO remove for all EVM chains
export async function removeNftsForWallet(args: WithLoggerType<Record<'wallet', PartialWallet>>) {
  const nfts = await pipe(
    getNftsForWallet,
    otherwise((err: unknown) => {
      args.logger?.error({ err, wallet: args.wallet }, 'could not get NFTs for wallet')
      return []
    })
  )(dissoc('logger', args))
  for (const nft of nfts) {
    await pipe(
      getNftSnapshot,
      otherwise((err: unknown) => {
        args.logger?.error({ err, nft }, 'could not get NFT snapshot')
        return undefined
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
