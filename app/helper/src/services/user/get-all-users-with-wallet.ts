import { getAllUsers } from '@echo/firestore/crud/user/get-all-users'
import { getWalletsForUser } from '@echo/firestore/crud/wallet/get-wallets-for-user'
import type { UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import type { Wallet } from '@echo/model/types/wallet'
import { promiseAll } from '@echo/utils/fp/promise-all'
import { propIsNotNilNorEmpty } from '@echo/utils/fp/prop-is-not-nil-nor-empty'
import { andThen, assoc, filter, head, isNil, map, pick, pipe, unless } from 'ramda'

// TODO Only works for a single wallet for now
export async function getAllUsersWithWallet() {
  return (await getAllUsers().then(
    pipe(
      // TODO functional program this, should also return wallet directly
      map((user: UserDocumentData) =>
        getWalletsForUser(user.id).then((wallets) =>
          assoc('wallet', pipe(head, unless(isNil, pick(['address', 'chainId'])))(wallets), user)
        )
      ),
      promiseAll,
      andThen(filter(propIsNotNilNorEmpty('wallet')))
    )
  )) as (UserDocumentData & Record<'wallet', Wallet>)[]
}
