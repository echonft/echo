import { CollectionName } from '@echo/firestore/constants/collection-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { AccountDocumentData } from '@echo/firestore/types/model/account-document-data'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import type { QueryDocumentSnapshot } from 'firebase-admin/lib/firestore'
import { head } from 'ramda'

export async function findAccountForUser(userId: string) {
  const querySnapshot = await firestoreApp().collection(CollectionName.ACCOUNTS).where('userId', '==', userId).get()

  if (querySnapshot.empty || isNilOrEmpty(querySnapshot.docs)) {
    return undefined
  }

  const documentSnapshot = head(querySnapshot.docs) as QueryDocumentSnapshot<AccountDocumentData>
  return documentSnapshot.data()
}
