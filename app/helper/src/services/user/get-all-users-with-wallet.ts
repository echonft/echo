import { getAllUsers } from '@echo/firestore/crud/user/get-all-users'
import { getWalletsForUser } from '@echo/firestore/crud/wallet/get-wallets-for-user'
import { getUser } from '@echo/firestore/helpers/user/get-user'
import type { UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import { promiseAll } from '@echo/utils/fp/promise-all'
import { andThen, flatten, map, pipe } from 'ramda'

export async function getAllUsersWithWallet() {
  return await getAllUsers().then(
    pipe(
      map((user: UserDocumentData) =>
        getWalletsForUser(user.id).then((wallets) => map((wallet) => getUser(user, wallet), wallets))
      ),
      promiseAll,
      andThen(flatten)
    )
  )
}
