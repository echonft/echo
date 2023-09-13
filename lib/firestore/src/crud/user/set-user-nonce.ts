import { updateUser } from '@echo/firestore/crud/user/update-user'

export async function setUserNonce(id: string, nonce: string) {
  return await updateUser(id, { nonce })
}
