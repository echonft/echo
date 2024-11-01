import { NonceError } from '@echo/firestore/constants/errors/nonce-error'
import { getNonce } from '@echo/firestore/crud/nonce/get-nonce'
import { getUserSnapshotById } from '@echo/firestore/crud/user/get-user-by-id'
import { noncesCollection } from '@echo/firestore/helpers/collection/collections'
import { setReference } from '@echo/firestore/helpers/reference/set-reference'
import type { NonceDocument } from '@echo/firestore/types/model/nonce-document'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { UserError } from '@echo/model/constants/errors/user-error'
import { isNil } from 'ramda'

export async function addNonce(data: NonceDocument): Promise<NewDocument<NonceDocument>> {
  const userSnapshot = await getUserSnapshotById(data.userId)
  if (!userSnapshot.exists) {
    return Promise.reject(Error(UserError.NotFound))
  }
  const nonce = await getNonce(data.userId)
  if (!isNil(nonce)) {
    return Promise.reject(Error(NonceError.Exists))
  }
  const id = await setReference({
    collectionReference: noncesCollection(),
    data
  })
  return { id, data }
}
