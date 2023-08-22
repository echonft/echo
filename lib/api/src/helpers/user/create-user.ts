import { addUser, User } from '@echo/firestore'

export const createUser = async (user: Omit<User, 'id' | 'nonce' | 'updatedAt' | 'wallets'>) => {
  try {
    await addUser(user)
  } catch (e) {
    throw Error('Error creating user')
  }
}
