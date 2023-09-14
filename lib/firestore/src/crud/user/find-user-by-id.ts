import { getUserSnapshotById } from '@echo/firestore/crud/user/get-user-snapshot-by-id'

export async function findUserById(id: string) {
  const documentSnapshot = await getUserSnapshotById(id)
  return documentSnapshot?.data()
}
