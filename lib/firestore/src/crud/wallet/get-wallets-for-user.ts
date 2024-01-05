import { getWalletsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-wallets-collection-reference'
import { getQuerySnapshotDocumentsData } from '@echo/firestore/helpers/crud/query/get-query-snapshot-documents-data'
import type { WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'

export async function getWalletsForUser(userId: string): Promise<WalletDocumentData[]> {
  const querySnapshot = await getWalletsCollectionReference().where('userId', '==', userId).get()
  return getQuerySnapshotDocumentsData(querySnapshot)
}
