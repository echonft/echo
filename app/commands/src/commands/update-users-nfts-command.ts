import { getLogger } from '@echo/commands/helpers/get-logger'
import type { Command, CommandName } from '@echo/commands/types/command'
import { getAllUsers } from '@echo/firestore/crud/user/get-all-users'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { deleteCollections } from '@echo/firestore/utils/delete-collections'
import { updateNftsForUser } from '@echo/tasks/update-nfts-for-user'

const name: CommandName = 'update-users-nfts'
/**
 *  Updates all the NFTs for every users in the DB
 */
export const updateUsersNftsCommand: Command = {
  name,
  execute: async function () {
    const logger = getLogger({
      override: {
        level: 'error'
      }
    }).child({ command: name })
    try {
      await initializeFirebase()
      await deleteCollections()
      const users = await getAllUsers()
      for (const user of users) {
        try {
          await updateNftsForUser({ user, logger })
        } catch (err) {
          logger.error({ err, user }, 'error upating user NFTs')
        }
      }
    } catch (err) {
      logger.error({ err }, 'error updating users NFT')
    }
  }
}
