import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference/collection-reference-name'
import { walletDataConverter } from '@echo/firestore/converters/wallet/wallet-data-converter'
import { firestoreApp } from '@echo/firestore/services/firestore-app'

export function getWalletsCollectionReference() {
  return firestoreApp().collection(CollectionReferenceName.WALLETS).withConverter(walletDataConverter)
}
