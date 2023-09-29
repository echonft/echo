import { CollectionName } from '@echo/firestore/constants/collection-name'
import { findNonceForUser } from '@echo/firestore/crud/nonce/find-nonce-for-user'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import dayjs from 'dayjs'
import { isNil } from 'ramda'

export async function setNonceForUser(userId: string, nonce: string) {
  const existingNonce = await findNonceForUser(userId)!
  const collectionRef = firestoreApp().collection(CollectionName.NONCES)
  const ref = isNil(existingNonce) ? collectionRef.doc() : collectionRef.doc(existingNonce.id)
  return await ref.set({ id: ref.id, userId, nonce, expiresAt: dayjs().add(1, 'h').unix() })
}
