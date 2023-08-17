import { DiscordGuild } from '../../types/model/discord-guild'
import { User } from '../../types/model/user'
import { includes } from 'ramda'

export const userIsInGuild = (user: User, discordGuild: DiscordGuild) =>
  includes(discordGuild, user.discordGuilds ?? [])
