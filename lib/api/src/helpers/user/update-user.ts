import { updateUser as firestoreUpdateUser, User } from '@echo/firestore'

export const updateUser = async (userId: string, user: Partial<User>) => {
  try {
    await firestoreUpdateUser(userId, user)
  } catch (e) {
    throw Error('Error updating user')
  }
}
