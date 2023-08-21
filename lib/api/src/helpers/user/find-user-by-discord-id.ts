import { ApiError } from '../api-error'
import { findUserByDiscordId as firestoreFindUserByDiscordId } from '@echo/firestore'

export const findUserByDiscordId = async (discordId: string, errorStatus: number, errorMessage: string) => {
  try {
    return await firestoreFindUserByDiscordId(discordId)
  } catch (e) {
    throw new ApiError(errorStatus, errorMessage)
  }
}
