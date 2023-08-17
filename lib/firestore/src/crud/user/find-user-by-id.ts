import { getUserSnapshotById } from './get-user-snapshot-by-id'

export const findUserById = async (id: string) => {
  const documentSnapshot = await getUserSnapshotById(id)
  return documentSnapshot.data()
}
