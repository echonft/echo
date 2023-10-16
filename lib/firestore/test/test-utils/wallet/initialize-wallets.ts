import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { walletMock } from '@echo/firestore-mocks/wallet/wallet-mock'

export async function initializeWallets() {
  const wallets = Object.values(walletMock)
  for (const wallet of wallets) {
    await firestoreApp().collection(CollectionReferenceName.WALLETS).doc(wallet.id).set(wallet)
  }
}
