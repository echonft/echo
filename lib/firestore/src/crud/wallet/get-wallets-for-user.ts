import { CollectionName } from '@echo/firestore/constants/collection-name'
import { walletDataConverter } from '@echo/firestore/converters/wallet/wallet-data-converter'
import { getQuerySnapshotDocumentsData } from '@echo/firestore/helpers/crud/get-query-snapshot-documents-data'
import { firestoreApp } from '@echo/firestore/services/firestore-app'

export async function getWalletsForUser(userId: string) {
  const querySnapshot = await firestoreApp()
    .collection(CollectionName.WALLETS)
    .where('userId', '==', userId)
    .withConverter(walletDataConverter)
    .get()

  return getQuerySnapshotDocumentsData(querySnapshot)
}
