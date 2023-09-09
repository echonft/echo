import { ServerError } from '../error/server-error'
import { updateUser as firestoreUpdateUser } from '@echo/firestore'
import { User } from '@echo/firestore-types'

export const updateUser = async (userId: string, user: Partial<User>) => {
  try {
    await firestoreUpdateUser(userId, user)
  } catch (e) {
    throw new ServerError(`error updating user with id ${userId} with values ${JSON.stringify(user)}`, e)
  }
}
