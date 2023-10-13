import { getUsersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-users-collection-reference'

export async function getUserSnapshotById(id: string) {
  const documentSnapshot = await getUsersCollectionReference().doc(id).get()
  if (!documentSnapshot.exists) {
    return undefined
  }
  return documentSnapshot
}
