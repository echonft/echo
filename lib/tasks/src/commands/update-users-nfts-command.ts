import { getAllUsers } from '@echo/firestore/crud/user/get-all-users'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { error, info } from '@echo/tasks/helpers/logger'
import { updateNftsForUser } from '@echo/tasks/tasks/update-nfts-for-user'
import { andThen, otherwise, pipe } from 'ramda'

export async function updateUsersNftsCommand() {
  await initializeFirebase()
  const users = await pipe(
    getAllUsers,
    otherwise((err) => {
      error({ err }, 'could not fetch users from Firestore')
      return []
    })
  )()
  for (const user of users) {
    await pipe(
      updateNftsForUser,
      andThen(() => {
        info({ user }, 'updated NFTs for user')
      }),
      otherwise((err) => {
        error({ err, user }, 'could not update NFTs for user')
      })
    )(user)
  }
}
