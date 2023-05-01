import { discordGuilds } from '../../utils/test/mocks/discord-guild/discord-guild'
import { discordGuildData } from '../../utils/test/mocks/discord-guild/discord-guild-data'
import { mapDiscordGuild } from '@echo/firestore'
import { describe, expect, it } from '@jest/globals'

describe('mappers - mapDiscordGuild', () => {
  it('correct mapping', async () => {
    const fetchedDiscordGuild = await mapDiscordGuild(Promise.resolve(discordGuildData['xA40abnyBq6qQHSYmtHj']!))
    expect(fetchedDiscordGuild).toEqual(discordGuilds['xA40abnyBq6qQHSYmtHj'])
  })
})
