import { getUserById } from '@echo/firestore/crud/user/get-user-by-id'
import { getWalletsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-wallets-collection-reference'
import { getQueryUniqueData } from '@echo/firestore/helpers/crud/query/get-query-unique-data'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { User } from '@echo/model/types/user'
import type { Wallet } from '@echo/model/types/wallet'
import { unlessNil } from '@echo/utils/fp/unless-nil'
import type { Nullable } from '@echo/utils/types/nullable'
import { andThen, pipe, prop } from 'ramda'

export function getUserByWallet(wallet: Wallet): Promise<Nullable<User>> {
  return pipe(
    getWalletsCollectionReference,
    queryWhere('address', '==', wallet.address),
    queryWhere('chain', '==', wallet.chain),
    getQueryUniqueData,
    andThen(unlessNil(pipe(prop('userId'), getUserById)))
  )()
}
