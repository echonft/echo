import { getLogger } from '@echo/commands/helpers/get-logger'
import type { Command } from '@echo/commands/types/command'
import { updateUserNfts } from '@echo/firestore-functions/tasks/nft/update-user-nfts'
import { getUserById } from '@echo/firestore/crud/user/get-user-by-id'
import { getAllWallets } from '@echo/firestore/crud/wallet/get-all-wallets'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { terminateFirestore } from '@echo/firestore/services/terminate-firestore'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { isNil } from 'ramda'

/**
 *  Fetch all the NFTs for all users in the DB.
 */
export const updateUsersNftsCommand: Command = {
  name: 'update-users-nfts',
  execute: async function () {
    const logger = getLogger().child({ command: 'update-users-nfts' })
    try {
      logger.info('Updating all users NFTs')
      try {
        await initializeFirebase()
        const wallets = await getAllWallets()
        for (const wallet of wallets) {
          try {
            const foundUser = await getUserById(wallet.userId)
            if (!isNil(foundUser)) {
              try {
                await updateUserNfts(foundUser, [wallet], logger)
              } catch (e) {
                logger.error(`error upating user ${wallet.userId} NFTs: ${errorMessage(e)}`)
              }
            }
          } catch (e) {
            logger.error(`error getting user ${wallet.userId}: ${errorMessage(e)}`)
          }
        }
      } catch (err) {
        logger.error('error updating users NFT')
      }
    } finally {
      await terminateFirestore()
    }
  }
}
