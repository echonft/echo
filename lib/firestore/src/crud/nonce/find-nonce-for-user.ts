import { CollectionName } from '@echo/firestore/constants/collection-name'
import { nonceDataConverter } from '@echo/firestore/converters/nonce-data-converter'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { FirestoreNonce } from '@echo/firestore/types/model/firestore-nonce'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import type { QueryDocumentSnapshot } from 'firebase-admin/lib/firestore'
import { head } from 'ramda'

export async function findNonceForUser(userId: string) {
  const querySnapshot = await firestoreApp()
    .collection(CollectionName.NONCES)
    .where('userId', '==', userId)
    .withConverter(nonceDataConverter)
    .get()

  if (querySnapshot.empty || isNilOrEmpty(querySnapshot.docs)) {
    return undefined
  }

  const documentSnapshot = head(querySnapshot.docs) as QueryDocumentSnapshot<FirestoreNonce>
  return documentSnapshot.data()
}
