import { getUserSnapshotByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { walletsCollection } from '@echo/firestore/helpers/collection/collections'
import { getQueryData } from '@echo/firestore/helpers/query/get-query-data'
import { queryLimit } from '@echo/firestore/helpers/query/query-limit'
import { queryWhere } from '@echo/firestore/helpers/query/query-where'
import type { WalletDocument } from '@echo/firestore/types/model/wallet-document'
import { WalletError } from '@echo/model/constants/errors/wallet-error'
import type { Username } from '@echo/model/types/username'
import { andThen, head, isNil, pipe } from 'ramda'

export async function getWalletForUser(username: Username): Promise<WalletDocument> {
  const snapshot = await getUserSnapshotByUsername(username)
  if (isNil(snapshot)) {
    return Promise.reject(Error(WalletError.NotFound))
  }
  return (await pipe(
    walletsCollection,
    queryWhere('userId', '==', snapshot.id),
    queryLimit(1),
    getQueryData,
    andThen(head)
  )()) as Promise<WalletDocument>
}
