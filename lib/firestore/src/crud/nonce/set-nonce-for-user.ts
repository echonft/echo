import { getNonceSnapshotForUser } from '@echo/firestore/crud/nonce/get-nonce-for-user'
import { getUserSnapshotByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { noncesCollection } from '@echo/firestore/helpers/collection/collections'
import { setReference } from '@echo/firestore/helpers/reference/set-reference'
import { updateReference } from '@echo/firestore/helpers/reference/update-reference'
import type { NonceDocument } from '@echo/firestore/types/model/nonce-document'
import type { Username } from '@echo/model/types/username'
import dayjs from 'dayjs'
import { isNil } from 'ramda'

export async function setNonceForUser(username: Username, nonce: string): Promise<NonceDocument> {
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
    await setReference({
      collectionReference: noncesCollection(),
      data
    })
    return data
  }
  return updateReference({
    collectionReference: noncesCollection(),
    id: nonceSnapshot.id,
    data: {
      nonce,
      expiresAt: dayjs().add(1, 'h').unix()
    }
  })
}
