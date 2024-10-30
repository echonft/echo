import { NonceError } from '@echo/firestore/constants/errors/nonce-error'
import { getNonce } from '@echo/firestore/crud/nonce/get-nonce'
import { noncesCollection } from '@echo/firestore/helpers/collection/collections'
import { setReference } from '@echo/firestore/helpers/reference/set-reference'
import type { NonceDocument } from '@echo/firestore/types/model/nonce-document'
import { isNil } from 'ramda'

export async function addNonce(data: NonceDocument): Promise<NonceDocument> {
  const nonce = await getNonce(data.wallet)
  if (!isNil(nonce)) {
    return Promise.reject(Error(NonceError.Exists))
  }
  await setReference({
    collectionReference: noncesCollection(),
    data
  })
  return data
}
