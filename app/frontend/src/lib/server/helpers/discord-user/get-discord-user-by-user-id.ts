import { findDiscordUserByUserId } from '@echo/firestore/crud/discord-user/find-discord-user-by-user-id'
import { ServerError } from '@server/helpers/error/server-error'

export async function getDiscordUserByUserId(userId: string) {
  try {
    return await findDiscordUserByUserId(userId)
  } catch (e) {
    throw new ServerError(`error getting discord user for user with id ${userId}`, e)
  }
}
