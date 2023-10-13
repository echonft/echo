import { CollectionName } from '@echo/firestore/constants/collection-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import type { CollectionReference } from 'firebase-admin/lib/firestore'

export function getWalletsCollection() {
  return firestoreApp().collection(CollectionName.WALLETS) as CollectionReference<WalletDocumentData>
}
