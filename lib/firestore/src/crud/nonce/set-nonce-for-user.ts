import { findNonceForUser } from '@echo/firestore/crud/nonce/find-nonce-for-user'
import { getNoncesCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nonces-collection-reference'
import type { Nonce } from '@echo/firestore/types/model/nonce/nonce'
import dayjs from 'dayjs'
import { isNil } from 'ramda'

export async function setNonceForUser(userId: string, nonce: string) {
  const existingNonce = await findNonceForUser(userId)
  const collectionRef = getNoncesCollectionReference()
  const ref = isNil(existingNonce) ? collectionRef.doc() : collectionRef.doc(existingNonce.id)
  const createdNonce: Nonce = { id: ref.id, userId, nonce, expired: false, expiresAt: dayjs().add(1, 'h').unix() }
  await ref.set(createdNonce)
  return createdNonce
}
