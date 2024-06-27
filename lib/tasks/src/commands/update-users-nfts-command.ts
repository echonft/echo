import { getAllUsers } from '@echo/firestore/crud/user/get-all-users'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { modelLoggerSerializers } from '@echo/model/constants/logger-serializers'
import { updateNftsForUser } from '@echo/tasks/update-nfts-for-user'
import { getBaseLogger } from '@echo/utils/services/logger'

export async function updateUsersNftsCommand() {
  const logger = getBaseLogger('UpdateUsersNftsCommand', { serializers: modelLoggerSerializers })
  try {
    await initializeFirebase()
    const users = await getAllUsers()
    for (const user of users) {
      try {
        await updateNftsForUser({ user, fetch, logger })
      } catch (err) {
        logger.error({ err, user }, 'error upating user NFTs')
      }
    }
  } catch (err) {
    logger.error({ err }, 'error updating users NFT')
  }
}
