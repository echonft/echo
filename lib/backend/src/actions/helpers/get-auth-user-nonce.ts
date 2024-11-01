import { AuthError } from '@echo/backend/errors/messages/auth-error'
import { getAuthUser } from '@echo/backend/helpers/auth/get-auth-user'
import { addNonce } from '@echo/firestore/crud/nonce/add-nonce'
import { getNonce } from '@echo/firestore/crud/nonce/get-nonce'
import { getUserSnapshotByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import type { NonceDocument } from '@echo/firestore/types/model/nonce-document'
import { UserError } from '@echo/model/constants/errors/user-error'
import { isNil } from 'ramda'
import { generateNonce } from 'siwe'

export async function getAuthUserNonce(): Promise<NonceDocument> {
  const user = await getAuthUser()
  if (isNil(user)) {
    return Promise.reject(Error(AuthError.Unauthorized))
  }
  const userSnapshot = await getUserSnapshotByUsername(user.username)
  if (isNil(userSnapshot)) {
    return Promise.reject(Error(UserError.NotFound))
  }
  const nonce = await getNonce(userSnapshot.id)
  if (isNil(nonce)) {
    // for backward compatibility
    const { data } = await addNonce({ userId: userSnapshot.id, nonce: generateNonce() })
    return data
  }
  return nonce
}
