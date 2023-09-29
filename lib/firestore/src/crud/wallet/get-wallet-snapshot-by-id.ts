import { CollectionName } from '@echo/firestore/constants/collection-name'
import { walletDataConverter } from '@echo/firestore/converters/wallet/wallet-data-converter'
import { getQuerySnapshotDocumentSnapshot } from '@echo/firestore/helpers/crud/get-query-snapshot-document-snapshot'
import { firestoreApp } from '@echo/firestore/services/firestore-app'

export async function getWalletSnapshotById(id: string) {
  const querySnapshot = await firestoreApp()
    .collection(CollectionName.WALLETS)
    .where('id', '==', id)
    .withConverter(walletDataConverter)
    .get()

  return getQuerySnapshotDocumentSnapshot(querySnapshot)
}
