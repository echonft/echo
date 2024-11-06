import type { UserDocument } from '@echo/firestore/types/model/user-document'
import { info } from '@echo/tasks/helpers/logger'
import { updateNftsForWallet } from '@echo/tasks/tasks/update-nfts-for-wallet'
import { isNil } from 'ramda'

/**
 * Updates all the NFTs of a user
 * @param user
 */
export async function updateNftsForUser(user: UserDocument): Promise<void> {
  info({ user }, 'updating NFTs for user')
  if (!isNil(user.wallet)) {
    await updateNftsForWallet(user.wallet)
    info({ user }, 'updated NFTs for user')
  }
}
