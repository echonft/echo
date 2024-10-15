import { getNonceSnapshotForUser } from '@echo/firestore/crud/nonce/get-nonce-for-user'
import { getUserSnapshotByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { getNoncesCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nonces-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import { updateReference } from '@echo/firestore/helpers/crud/reference/update-reference'
import type { Nonce } from '@echo/firestore/types/model/nonce'
import type { NonceDocumentData } from '@echo/firestore/types/model/nonce-document-data'
import dayjs from 'dayjs'
import { isNil } from 'ramda'

export async function setNonceForUser(username: string, nonce: string): Promise<Nonce> {
  const userSnapshot = await getUserSnapshotByUsername(username)
  if (isNil(userSnapshot) || isNil(userSnapshot.data())) {
    return Promise.reject(Error(`user with username ${username} not found`))
  }

  const nonceSnapshot = await getNonceSnapshotForUser(userSnapshot.data().username)
  if (isNil(nonceSnapshot)) {
    const data = {
      userId: userSnapshot.id,
      nonce,
      expired: false,
      expiresAt: dayjs().add(1, 'h').unix()
    }
    await setReference<Nonce, NonceDocumentData>({
      collectionReference: getNoncesCollectionReference(),
      data
    })
    return data
  }
  return updateReference({
    collectionReference: getNoncesCollectionReference(),
    id: nonceSnapshot.id,
    data: {
      nonce,
      expiresAt: dayjs().add(1, 'h').unix()
    }
  })
}
