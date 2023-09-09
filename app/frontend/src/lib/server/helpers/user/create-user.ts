import { DiscordUser } from '../../types/user/discord-user'
import { ServerError } from '../error/server-error'
import { addUser } from '@echo/firestore'

export const createUser = async (user: DiscordUser & { username: string }) => {
  try {
    return await addUser(user)
  } catch (e) {
    throw new ServerError(`'error creating user ${JSON.stringify(user)}`, e)
  }
}
