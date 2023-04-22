import { DiscordGuild } from '../../../../types/discord-guild'
import { mockDiscordGuild } from './mock-discord-guild'
import { complement, isNil, mergeLeft, pickBy } from 'ramda'

export const generateMockGuild: (guildData: Partial<DiscordGuild>) => DiscordGuild = (guildData) =>
  mergeLeft(pickBy(complement(isNil), guildData), mockDiscordGuild)
