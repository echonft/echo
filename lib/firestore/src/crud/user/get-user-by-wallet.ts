import { getUserById } from '@echo/firestore/crud/user/get-user-by-id'
import { walletsCollection } from '@echo/firestore/helpers/collection/collections'
import { getQueryUniqueData } from '@echo/firestore/helpers/query/get-query-unique-data'
import { queryWhere } from '@echo/firestore/helpers/query/query-where'
import type { UserDocument } from '@echo/firestore/types/model/user-document'
import type { Wallet } from '@echo/model/types/wallet'
import { unlessNil } from '@echo/utils/helpers/unless-nil'
import type { Nullable } from '@echo/utils/types/nullable'
import { andThen, pipe, prop } from 'ramda'

export function getUserByWallet(wallet: Wallet): Promise<Nullable<UserDocument>> {
  return pipe(
    walletsCollection,
    queryWhere('address', '==', wallet.address),
    queryWhere('vm', '==', wallet.vm),
    getQueryUniqueData,
    andThen(unlessNil(pipe(prop('userId'), getUserById)))
  )()
}
