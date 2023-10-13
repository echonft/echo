import { CollectionName } from '@echo/firestore/constants/collection-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { Account } from '@echo/firestore/types/model/account/account'
import type { CollectionReference } from 'firebase-admin/lib/firestore'

export function getAccountsCollection() {
  return firestoreApp().collection(CollectionName.ACCOUNTS) as CollectionReference<Account>
}
