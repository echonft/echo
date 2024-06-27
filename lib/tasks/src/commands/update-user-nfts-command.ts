import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { modelLoggerSerializers } from '@echo/model/constants/logger-serializers'
import { updateNftsForUser } from '@echo/tasks/update-nfts-for-user'
import { getBaseLogger } from '@echo/utils/services/logger'
import { isNil } from 'ramda'

export async function updateUserNftsCommand(username: string) {
  const logger = getBaseLogger('UpdateUserNftsCommand', { serializers: modelLoggerSerializers })
  try {
    await initializeFirebase()
    const user = await getUserByUsername(username)
    if (isNil(user)) {
      logger.error({ user: { username } }, 'user not found')
      return
    }
    try {
      await updateNftsForUser({ user, logger })
    } catch (err) {
      logger.error({ err, user }, 'error upating user NFTs')
    }
  } catch (err) {
    logger.error({ err, user: { username } }, 'error updating user NFT')
  }
}
