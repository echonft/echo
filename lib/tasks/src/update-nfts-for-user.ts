import { getWalletsForUser } from '@echo/firestore/crud/wallet/get-wallets-for-user'
import type { UserDocument } from '@echo/firestore/types/model/user-document'
import { error, info } from '@echo/tasks/helpers/logger'
import { updateNftsForWallet } from '@echo/tasks/update-nfts-for-wallet'
import { otherwise, pipe } from 'ramda'

/**
 * Updates all the NFTs of a user
 * @param user
 */
export async function updateNftsForUser(user: UserDocument): Promise<void> {
  info({ user }, 'updating NFTs for user')
  const wallets = await pipe(
    getWalletsForUser,
    otherwise((err) => {
      error({ err, user }, 'could not get wallets for user')
      return []
    })
  )(user.username)
  for (const wallet of wallets) {
    await updateNftsForWallet({ wallet, logger })
  }
  info({ user }, 'updated NFTs for user')
}
