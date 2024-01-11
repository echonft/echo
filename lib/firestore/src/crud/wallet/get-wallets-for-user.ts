import { findUserByUsername } from '@echo/firestore/crud/user/find-user-by-username'
import { getWalletsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-wallets-collection-reference'
import { getQuerySnapshotDocumentsData } from '@echo/firestore/helpers/crud/query/get-query-snapshot-documents-data'
import type { WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import { isNil } from 'ramda'

export async function getWalletsForUser(username: string): Promise<WalletDocumentData[]> {
  const user = await findUserByUsername(username)
  if (isNil(user)) {
    throw Error(`user with username ${username} not found`)
  }
  const querySnapshot = await getWalletsCollectionReference().where('userId', '==', user.id).get()
  return getQuerySnapshotDocumentsData(querySnapshot)
}
