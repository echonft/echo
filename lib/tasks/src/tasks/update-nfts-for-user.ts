import type { UserDocument } from '@echo/firestore/types/model/user-document'
import { WalletError } from '@echo/model/constants/errors/wallet-error'
import { info, warn } from '@echo/tasks/helpers/logger'
import { updateNftsForWallet } from '@echo/tasks/tasks/update-nfts-for-wallet'
import { isNil } from 'ramda'

/**
 * Updates all the NFTs of a user
 * @param user
 */
export async function updateNftsForUser(user: UserDocument): Promise<void> {
  info({ user }, 'updating NFTs for user')
  if (isNil(user.wallet)) {
    warn({ user }, WalletError.NotFound)
    return
  }
  await updateNftsForWallet(user.wallet)
  info({ user }, 'updated NFTs for user')
}
