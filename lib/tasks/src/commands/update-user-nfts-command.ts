import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { getLogger } from '@echo/tasks/commands/get-logger'
import { updateNftsForUser } from '@echo/tasks/update-nfts-for-user'
import { andThen, isNil, otherwise, pipe, tap } from 'ramda'

export async function updateUserNftsCommand(username: string) {
  const logger = getLogger(updateUserNftsCommand.name)
  await initializeFirebase()
  const user = await pipe(
    getUserByUsername,
    andThen(
      tap((user) => {
        if (isNil(user)) {
          logger.error({ user: { username } }, 'user not found')
        }
      })
    ),
    otherwise((err) => {
      logger.error({ err, user: { username } }, 'could not fetch user from Firestore')
    })
  )(username)
  if (!isNil(user)) {
    await pipe(
      updateNftsForUser,
      andThen(() => {
        logger.info({ user }, 'updated NFTs for user')
      }),
      otherwise((err) => {
        logger.error({ err, user }, 'could not update NFTs')
      })
    )({ user, fetch, logger })
  }
}
