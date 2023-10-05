import { getUsersCollection } from '@echo/firestore/helpers/collection/get-users-collection'

export async function getUserSnapshotById(id: string) {
  const documentSnapshot = await getUsersCollection().doc(id).get()
  if (!documentSnapshot.exists) {
    return undefined
  }
  return documentSnapshot
}
