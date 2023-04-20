import { DiscordGuild } from '../../types/discord-guild'
import { User } from '../../types/user'

//  TODO Add test
export const userIsInGuild = (user: User, guild: DiscordGuild) =>
  user.discordGuilds.some((userGuild) => userGuild.id === guild.id)
