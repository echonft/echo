import { CollectionName } from '@echo/firestore/constants/collection-name'
import { walletDataConverter } from '@echo/firestore/converters/wallet/wallet-data-converter'
import { getQuerySnapshotDocumentsData } from '@echo/firestore/helpers/crud/get-query-snapshot-documents-data'
import { firestoreApp } from '@echo/firestore/services/firestore-app'

export async function getAllWallets() {
  const querySnapshot = await firestoreApp().collection(CollectionName.WALLETS).withConverter(walletDataConverter).get()
  return getQuerySnapshotDocumentsData(querySnapshot)
}
