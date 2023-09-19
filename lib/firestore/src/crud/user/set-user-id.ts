import { getUserSnapshotByUsername } from '@echo/firestore/crud/user/get-user-snapshot-by-username'
import { isNil } from 'ramda'

/**
 * Sets the user id
 * This is used to set the "id" field to user in the database because next-auth firestore adapter doesn't
 * @param {string} username
 * @return {Promise<FirebaseFirestore.WriteResult>}
 */
export async function setUserId(username: string): Promise<string> {
  const documentSnapshot = await getUserSnapshotByUsername(username)
  if (isNil(documentSnapshot)) {
    throw Error(`user with username ${username} does not exist`)
  }
  const { id } = documentSnapshot
  await documentSnapshot.ref.update({ id })
  return id
}
