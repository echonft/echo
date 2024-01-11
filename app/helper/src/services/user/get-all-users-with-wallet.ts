import { getAllUsers } from '@echo/firestore/crud/user/get-all-users'
import { getWalletsForUser } from '@echo/firestore/crud/wallet/get-wallets-for-user'
import { createUserFromFirestoreData } from '@echo/firestore/helpers/user/create-user-from-firestore-data'
import { promiseAll } from '@echo/utils/fp/promise-all'
import { andThen, flatten, map, pipe } from 'ramda'

export function getAllUsersWithWallet() {
  return pipe(
    getAllUsers,
    andThen(
      pipe(
        map((user) =>
          getWalletsForUser(user.username).then((wallets) =>
            map((wallet) => createUserFromFirestoreData(user, wallet), wallets)
          )
        ),
        promiseAll,
        andThen(flatten)
      )
    )
  )()
}
