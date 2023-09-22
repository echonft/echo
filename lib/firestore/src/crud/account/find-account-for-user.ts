import { CollectionName } from '@echo/firestore/constants/collection-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { FirestoreAccount } from '@echo/firestore/types/model/account/firestore-account'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import type { QueryDocumentSnapshot } from 'firebase-admin/lib/firestore'
import { head } from 'ramda'

export async function findAccountForUser(userId: string) {
  const querySnapshot = await firestoreApp().collection(CollectionName.ACCOUNTS).where('userId', '==', userId).get()

  if (querySnapshot.empty || isNilOrEmpty(querySnapshot.docs)) {
    return undefined
  }

  const documentSnapshot = head(querySnapshot.docs) as QueryDocumentSnapshot<FirestoreAccount>
  return documentSnapshot.data()
}
