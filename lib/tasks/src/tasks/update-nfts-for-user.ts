import type { UserDocument } from '@echo/firestore/types/model/user-document'
import { info } from '@echo/tasks/helpers/logger'
import { updateNftsForWallet } from '@echo/tasks/tasks/update-nfts-for-wallet'
import { unlessNil } from '@echo/utils/helpers/unless-nil'
import { pipe, prop } from 'ramda'

/**
 * Updates all the NFTs of a user
 * @param user
 */
export async function updateNftsForUser(user: UserDocument): Promise<void> {
  info({ user }, 'updating NFTs for user')
  await pipe(prop('wallet'), unlessNil(updateNftsForWallet))(user)
  info({ user }, 'updated NFTs for user')
}
