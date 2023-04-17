import { DiscordGuild } from '@echo/model'
import { mockDiscordGuild } from '@echo/model/dist/utils/tests/mocks/discord-guild'

// Mock function, only works for mock guild ID
export async function getGuildById(guildId: string): Promise<DiscordGuild | undefined> {
  if (guildId === 'xA40abnyBq6qQHSYmtHj') {
    return Promise.resolve(mockDiscordGuild)
  }
  // Not ideal but works for testing
  if (guildId === 'empty–contract') {
    return Promise.resolve({ ...mockDiscordGuild, contracts: [] })
  }
  return Promise.resolve(undefined)
}
