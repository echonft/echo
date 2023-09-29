import { CollectionName } from '@echo/firestore/constants/collection-name'
import { walletDataConverter } from '@echo/firestore/converters/wallet/wallet-data-converter'
import { getQuerySnapshotDocumentData } from '@echo/firestore/helpers/crud/get-query-snapshot-document-data'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { WalletData } from '@echo/firestore/types/model/wallet/wallet-data'

export async function findWalletByAddress(wallet: WalletData) {
  const querySnapshot = await firestoreApp()
    .collection(CollectionName.WALLETS)
    .where('address', '==', wallet.address)
    .where('chainId', '==', wallet.chainId)
    .withConverter(walletDataConverter)
    .get()

  return getQuerySnapshotDocumentData(querySnapshot)
}
