import { discordGuildEquals } from '../../predicates/discord-guild/discord-guild-equals'
import { DiscordGuild } from '../../types/discord-guild'
import { User } from '../../types/user'
import { any } from 'ramda'

export const userIsInGuild = (user: User, guild: DiscordGuild) => any(discordGuildEquals(guild), user.discordGuilds)
