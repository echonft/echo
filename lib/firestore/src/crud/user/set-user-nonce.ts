import { updateUser } from './update-user'
import { generateNonce } from 'siwe'

export const setUserNonce = async (id: string): Promise<string> => {
  const nonce = generateNonce()
  await updateUser(id, { nonce })
  return nonce
}
