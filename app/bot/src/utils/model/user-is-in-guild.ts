import { FirestoreDiscordGuildData, FirestoreUserData } from '@echo/firestore'
import { DiscordGuild, User, userIsInGuild as modelUserIsInGuild } from '@echo/model'

/**
 * Simple util method to avoid casting. The data is essentially the same for the function so casting is safe
 * @param user
 * @param discordGuild
 */
export function userIsInGuild(user: FirestoreUserData, discordGuild: FirestoreDiscordGuildData): boolean {
  return modelUserIsInGuild(user as unknown as User, discordGuild as unknown as DiscordGuild)
}
