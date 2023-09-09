import { ServerError } from '../error/server-error'
import { findUserByDiscordId } from '@echo/firestore'

export const getUserByDiscordId = async (discordId: string) => {
  try {
    return await findUserByDiscordId(discordId)
  } catch (e) {
    throw new ServerError(`error getting user with discord id ${discordId}`, e)
  }
}
