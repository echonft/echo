import { getAllUsers } from '@echo/firestore/crud/user/get-all-users'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { getLogger } from '@echo/tasks/commands/get-logger'
import { updateNftsForUser } from '@echo/tasks/update-nfts-for-user'
import { andThen, otherwise, pipe } from 'ramda'

export async function updateUsersNftsCommand() {
  const logger = getLogger(updateUsersNftsCommand.name)
  await initializeFirebase()
  const users = await pipe(
    getAllUsers,
    otherwise((err) => {
      logger.error({ err }, 'could not fetch users from Firestore')
      return []
    })
  )()
  for (const user of users) {
    await pipe(
      updateNftsForUser,
      andThen(() => {
        logger.info({ user }, 'updated NFTs for user')
      }),
      otherwise((err) => {
        logger.error({ err, user }, 'could not update NFTs for user')
      })
    )({ user, fetch, logger })
  }
}
