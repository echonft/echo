import { findNonceForUser } from '@echo/firestore/crud/nonce/find-nonce-for-user'
import { getNoncesCollection } from '@echo/firestore/helpers/collection/get-nonces-collection'
import dayjs from 'dayjs'
import { isNil } from 'ramda'

export async function setNonceForUser(userId: string, nonce: string) {
  const existingNonce = await findNonceForUser(userId)
  const collectionRef = getNoncesCollection()
  const ref = isNil(existingNonce) ? collectionRef.doc() : collectionRef.doc(existingNonce.id)
  return await ref.set({ id: ref.id, userId, nonce, expired: false, expiresAt: dayjs().add(1, 'h') })
}
