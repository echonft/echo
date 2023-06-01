import { discordGuildEquals } from '../../predicates/discord-guild/discord-guild-equals'
import { DiscordGuild } from '../../types/discord-guild'
import { User } from '../../types/user'
import { any } from 'ramda'

/**
 * Check if user is in guild. We check `discordGuilds` for undefined because we use this function
 * with FirestoreUserData too which can be undefined.
 * @param user
 * @param guild
 */
export const userIsInGuild = (user: User, guild: DiscordGuild) =>
  any(discordGuildEquals(guild), user.discordGuilds ?? [])
