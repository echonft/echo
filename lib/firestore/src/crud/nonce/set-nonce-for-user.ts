import { getNonceSnapshotForUser } from '@echo/firestore/crud/nonce/get-nonce-for-user'
import { getNoncesCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nonces-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import { updateReference } from '@echo/firestore/helpers/crud/reference/update-reference'
import type { Nonce } from '@echo/firestore/types/model/nonce/nonce'
import dayjs from 'dayjs'
import { isNil } from 'ramda'

export async function setNonceForUser(userId: string, nonce: string): Promise<Nonce> {
  const snapshot = await getNonceSnapshotForUser(userId)
  if (isNil(snapshot)) {
    const data = {
      userId,
      nonce,
      expired: false,
      expiresAt: dayjs().add(1, 'h').unix()
    }
    await setReference<Nonce>({
      collectionReference: getNoncesCollectionReference(),
      data
    })
    return data
  }
  return updateReference<Nonce>({
    collectionReference: getNoncesCollectionReference(),
    id: snapshot.id,
    data: {
      nonce,
      expiresAt: dayjs().add(1, 'h').unix()
    }
  })
}
