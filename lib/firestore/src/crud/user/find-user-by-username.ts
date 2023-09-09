import { getUserSnapshotByUsername } from './get-user-snapshot-by-username'

export async function findUserByUsername(username: string) {
  const documentSnapshot = await getUserSnapshotByUsername(username)
  return documentSnapshot?.data()
}
