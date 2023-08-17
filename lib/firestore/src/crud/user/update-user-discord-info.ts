import { DiscordGuild } from '../../types/model/discord-guild'
import { updateUser } from './update-user'

export const updateUserDiscordInfo = (
  userId: string,
  discordAvatar: string,
  discordBanner: string,
  discordGuilds: DiscordGuild[]
) => updateUser(userId, { discordAvatar, discordBanner, discordGuilds })
