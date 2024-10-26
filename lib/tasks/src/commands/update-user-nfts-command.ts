import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import type { Username } from '@echo/model/types/username'
import { error, info } from '@echo/tasks/helpers/logger'
import { updateNftsForUser } from '@echo/tasks/tasks/update-nfts-for-user'
import { andThen, isNil, otherwise, pipe, tap } from 'ramda'

export async function updateUserNftsCommand(username: string) {
  await initializeFirebase()
  const user = await pipe(
    getUserByUsername,
    andThen(
      tap((user) => {
        if (isNil(user)) {
          error({ user: { username } }, 'user not found')
        }
      })
    ),
    otherwise((err) => {
      error({ err, user: { username } }, 'could not fetch user from Firestore')
    })
  )(username as Username)
  if (!isNil(user)) {
    await pipe(
      updateNftsForUser,
      andThen(() => {
        info({ user }, 'updated NFTs for user')
      }),
      otherwise((err) => {
        error({ err, user }, 'could not update NFTs')
      })
    )(user)
  }
}
