import { findNonceForUser } from '@echo/firestore/crud/nonce/find-nonce-for-user'
import { getNoncesCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nonces-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import { updateReference } from '@echo/firestore/helpers/crud/reference/update-reference'
import type { Nonce } from '@echo/firestore/types/model/nonce/nonce'
import dayjs from 'dayjs'
import { assoc, isNil, omit, pipe } from 'ramda'

export async function setNonceForUser(userId: string, nonce: string): Promise<Nonce> {
  const existingNonce = await findNonceForUser(userId)
  if (isNil(existingNonce)) {
    return pipe(
      getNoncesCollectionReference,
      setReference({ userId, nonce, expired: false, expiresAt: dayjs().add(1, 'h').unix() })
    )()
  }
  const updatedNonce: Nonce = pipe<[Nonce], Nonce, Nonce>(
    assoc('nonce', nonce),
    assoc('expiresAt', dayjs().add(1, 'h').unix())
  )(existingNonce)
  await pipe(getNoncesCollectionReference, updateReference(existingNonce.id, omit(['id'], existingNonce)))()
  return updatedNonce
}
