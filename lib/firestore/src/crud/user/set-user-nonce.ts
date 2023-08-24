import { updateUser } from './update-user'

export const setUserNonce = async (id: string, nonce: string) => {
  return await updateUser(id, { nonce })
}
