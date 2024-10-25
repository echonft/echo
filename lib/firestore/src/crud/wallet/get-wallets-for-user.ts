import { getUserSnapshotByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { walletsCollection } from '@echo/firestore/helpers/collection/collections'
import { getQueryData } from '@echo/firestore/helpers/query/get-query-data'
import { queryWhere } from '@echo/firestore/helpers/query/query-where'
import type { WalletDocument } from '@echo/firestore/types/model/wallet-document'
import type { Username } from '@echo/model/types/username'
import { isNil, pipe } from 'ramda'

export async function getWalletsForUser(username: Username): Promise<WalletDocument[]> {
  const snapshot = await getUserSnapshotByUsername(username)
  if (isNil(snapshot)) {
    return []
  }
  return pipe(walletsCollection, queryWhere('userId', '==', snapshot.id), getQueryData)()
}
