import { DiscordGuild } from '../../../../types/discord-guild'
import { mockDiscordGuild } from './mock-discord-guild'
import { mergeLeft } from 'ramda'

export const generateMockGuild: (guildData: Partial<DiscordGuild>) => DiscordGuild = (guildData) =>
  mergeLeft(guildData, mockDiscordGuild)
