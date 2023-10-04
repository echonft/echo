import { CollectionName } from '@echo/firestore/constants/collection-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { FirestoreAccount } from '@echo/firestore/types/model/account/firestore-account'
import type { CollectionReference } from 'firebase-admin/lib/firestore'

export function getAccountsCollection() {
  return firestoreApp().collection(CollectionName.ACCOUNTS) as CollectionReference<FirestoreAccount>
}
