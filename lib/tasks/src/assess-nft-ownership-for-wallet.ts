import { getNftsForWallet } from '@echo/firestore/crud/nft/get-nfts-for-wallet'
import type { Wallet } from '@echo/model/types/wallet'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { getNftOwner } from '@echo/web3/helpers/nft/get-nft-owner'
import { dissoc, equals, isNil } from 'ramda'

export async function assessNftOwnershipForWallet(args: WithLoggerType<Record<'wallet', Wallet>>) {
  const logger = args.logger?.child({ fn: assessNftOwnershipForWallet.name })
  const nfts = await getNftsForWallet(dissoc('logger', args))
  for (const nft of nfts) {
    const owner = await getNftOwner(nft)
    if (isNil(owner)) {
      logger?.error({ nft, owner }, 'cannot get owner')
    } else {
      if (equals(owner, nft.owner.wallet)) {
        logger?.info({ nft, owner }, 'valid owner')
      } else {
        logger?.warn({ nft, owner }, 'invalid owner')
      }
    }
  }
}
