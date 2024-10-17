import { getUserSnapshotByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { getWalletsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-wallets-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import { mapWalletDocumentDataToWallet } from '@echo/firestore/mappers/wallet/map-wallet-document-data-to-wallet'
import type { Wallet } from '@echo/model/types/wallet'
import { andThen, isNil, map, pipe } from 'ramda'

export async function getWalletsForUser(username: string): Promise<Wallet[]> {
  const snapshot = await getUserSnapshotByUsername(username)
  if (isNil(snapshot)) {
    return []
  }
  return pipe(
    getWalletsCollectionReference,
    queryWhere('userId', '==', snapshot.id),
    getQueryData,
    andThen(map(mapWalletDocumentDataToWallet))
  )()
}
