import { DiscordGuild } from '../../types/model/discord-guild'
import { User } from '../../types/model/user'
import { includes, map, prop } from 'ramda'

export const userIsInGuild = (user: User, discordGuild: DiscordGuild) =>
  includes(discordGuild.discordId, map(prop('discordId'), user.discordGuilds))
