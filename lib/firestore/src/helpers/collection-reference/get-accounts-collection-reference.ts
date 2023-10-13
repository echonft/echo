import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { Account } from '@echo/firestore/types/model/account/account'
import type { CollectionReference } from 'firebase-admin/lib/firestore'

export function getAccountsCollectionReference() {
  return firestoreApp().collection(CollectionReferenceName.ACCOUNTS) as CollectionReference<Account>
}
