import { CollectionName } from '@echo/firestore/constants/collection-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { FirestoreWallet } from '@echo/firestore/types/model/wallet/firestore-wallet'
import type { CollectionReference } from 'firebase-admin/lib/firestore'

export function getWalletsCollection() {
  return firestoreApp().collection(CollectionName.WALLETS) as CollectionReference<FirestoreWallet>
}
