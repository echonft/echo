import { getUserSnapshotByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { getWalletsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-wallets-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { Username } from '@echo/model/types/username'
import type { Wallet } from '@echo/model/types/wallet'
import { isNil, pipe } from 'ramda'

export async function getWalletsForUser(username: Username): Promise<Wallet[]> {
  const snapshot = await getUserSnapshotByUsername(username)
  if (isNil(snapshot)) {
    return []
  }
  return pipe(getWalletsCollectionReference, queryWhere('userId', '==', snapshot.id), getQueryData)()
}
