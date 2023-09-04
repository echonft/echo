import { updateUser as firestoreUpdateUser } from '@echo/firestore'
import { User } from '@echo/firestore-types'

export const updateUser = async (userId: string, user: Partial<User>) => {
  try {
    await firestoreUpdateUser(userId, user)
  } catch (e) {
    throw Error('Error updating user')
  }
}
