import { getUserSnapshotByUsername } from '@echo/firestore/crud/user/get-user-snapshot-by-username'
import type { WriteResult } from 'firebase-admin/lib/firestore'
import { isNil } from 'ramda'

/**
 * Sets the user id
 * This is used to set the "id" field to user in the database because next-auth firestore adapter doesn't
 * @param {string} username
 * @return {Promise<FirebaseFirestore.WriteResult>}
 */
export async function setUserId(username: string): Promise<WriteResult> {
  const documentSnapshot = await getUserSnapshotByUsername(username)
  if (isNil(documentSnapshot)) {
    throw Error(`user with username ${username} does not exist`)
  }
  return await documentSnapshot.ref.update({ id: documentSnapshot.id })
}
