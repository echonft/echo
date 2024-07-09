import { getNftsForWallet } from '@echo/firestore/crud/nft/get-nfts-for-wallet'
import type { PartialWallet } from '@echo/firestore/types/model/wallet/wallet-document-data'
import { changeNftOwnership } from '@echo/tasks/change-nft-ownership'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { getNftOwner } from '@echo/web3/helpers/nft/get-nft-owner'
import { dissoc, equals, isNil, otherwise, pipe } from 'ramda'

/**
 * Assesses the ownership of the NFTs associated with a given wallet in Firestore
 * Updates the ownership if necessary
 * @param args
 */
export async function assessNftOwnershipForWallet(
  args: WithLoggerType<Record<'wallet', PartialWallet>>
): Promise<void> {
  const nfts = await pipe(
    getNftsForWallet,
    otherwise((err) => {
      args.logger?.error({ err, wallet: args.wallet }, 'could not NFTs for wallet')
      return []
    })
  )(dissoc('logger', args))
  for (const nft of nfts) {
    const wallet = await pipe(
      getNftOwner,
      otherwise((err) => {
        args.logger?.error({ err, nft }, 'could not get NFT owner')
        return undefined
      })
    )(nft)
    if (!isNil(wallet)) {
      if (equals(wallet, nft.owner.wallet)) {
        args.logger?.info({ nft, owner: wallet }, 'valid owner')
      } else {
        args.logger?.warn({ nft, owner: wallet }, 'invalid owner')
        await pipe(
          changeNftOwnership,
          otherwise((err) => {
            args.logger?.error({ err, nft, owner: wallet }, 'could not update NFT ownership')
          })
        )({ nft, owner: { wallet }, logger: args.logger })
      }
    }
  }
}
