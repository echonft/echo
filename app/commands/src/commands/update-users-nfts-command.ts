import { getLogger } from '@echo/commands/helpers/get-logger'
import type { Command } from '@echo/commands/types/command'
import { getAllUsers } from '@echo/firestore/crud/user/get-all-users'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { updateNftsForUser } from '@echo/tasks/update-nfts-for-user'

/**
 *  Fetch all the NFTs for all users in the DB.
 */
export const updateUsersNftsCommand: Command = {
  name: 'update-users-nfts',
  execute: async function () {
    const logger = getLogger().child({ command: 'update-users-nfts' })
    logger.info('Updating all users NFTs')
    try {
      await initializeFirebase()
      const users = await getAllUsers()
      for (const user of users) {
        try {
          await updateNftsForUser({ user, logger })
        } catch (err) {
          logger.error({ err, user }, 'error upating user NFTs')
        }
      }
    } catch (err) {
      logger.error('error updating users NFT')
    }
  }
}
