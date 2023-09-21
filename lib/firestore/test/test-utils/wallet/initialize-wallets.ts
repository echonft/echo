import { CollectionName } from '@echo/firestore/constants/collection-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { walletDocumentDataMock } from '@echo/firestore-mocks/wallet/wallet-document-data-mock'

export async function initializeWallets() {
  const wallets = Object.values(walletDocumentDataMock)
  for (const wallet of wallets) {
    await firestoreApp().collection(CollectionName.WALLETS).doc(wallet.id).set(wallet)
  }
}
