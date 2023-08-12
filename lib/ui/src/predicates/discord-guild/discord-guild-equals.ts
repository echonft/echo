import { DiscordGuild } from '../../types/discord-guild'

export const discordGuildEquals = (source: DiscordGuild) => (target: DiscordGuild) =>
  source.discordId === target.discordId
