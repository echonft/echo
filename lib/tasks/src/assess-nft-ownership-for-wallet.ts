import { getNftsForWallet } from '@echo/firestore/crud/nft/get-nfts-for-wallet'
import type { PartialWallet } from '@echo/firestore/types/model/wallet/wallet-document-data'
import { changeNftOwnership } from '@echo/tasks/change-nft-ownership'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { getNftOwner } from '@echo/web3/helpers/nft/get-nft-owner'
import { dissoc, equals, isNil, otherwise, pipe } from 'ramda'

export async function assessNftOwnershipForWallet(args: WithLoggerType<Record<'wallet', PartialWallet>>) {
  const logger = args.logger?.child({ fn: assessNftOwnershipForWallet.name })
  const nfts = await pipe(
    getNftsForWallet,
    otherwise((err) => {
      logger?.error({ err, wallet: args.wallet }, 'could not NFTs for wallet')
      return []
    })
  )(dissoc('logger', args))
  for (const nft of nfts) {
    const wallet = await getNftOwner(nft)
    if (isNil(wallet)) {
      logger?.error({ nft, owner: wallet }, 'cannot get owner')
    } else {
      if (equals(wallet, nft.owner.wallet)) {
        logger?.info({ nft, owner: wallet }, 'valid owner')
      } else {
        logger?.warn({ nft, owner: wallet }, 'invalid owner')
        await changeNftOwnership({ nft, wallet, logger })
      }
    }
  }
}
