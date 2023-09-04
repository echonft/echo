import { DiscordUser } from '../../types/user/discord-user'
import { addUser } from '@echo/firestore'

export const createUser = async (user: DiscordUser) => {
  try {
    return await addUser(user)
  } catch (e) {
    throw Error('Error creating user')
  }
}
