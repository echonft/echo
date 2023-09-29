import { setUserId as firestoreSetUserId } from '@echo/firestore/crud/user/set-user-id'

export async function setUserId(username: string) {
  return await firestoreSetUserId(username)
}
