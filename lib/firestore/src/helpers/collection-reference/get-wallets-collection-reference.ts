import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference/collection-reference-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { type WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import { CollectionReference } from 'firebase-admin/firestore'

export function getWalletsCollectionReference() {
  return firestoreApp().collection(CollectionReferenceName.WALLETS) as CollectionReference<WalletDocumentData>
}
