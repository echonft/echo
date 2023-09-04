import { findUserByDiscordId as firestoreFindUserByDiscordId } from '@echo/firestore'

export const findUserByDiscordId = async (discordId: string) => {
  try {
    return await firestoreFindUserByDiscordId(discordId)
  } catch (e) {
    throw Error('Error fetching user')
  }
}
