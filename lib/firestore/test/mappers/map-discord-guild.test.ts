import { mapDiscordGuild } from '../../src/mappers/discord-guild/map-discord-guild'
import { discordGuildFirestoreData } from '../../src/mocks/discord-guild-firestore-data'
import { discordGuilds } from '@echo/model'
import { describe, expect, it } from '@jest/globals'

describe('mappers - mapDiscordGuild', () => {
  it('correct mapping', async () => {
    const fetchedDiscordGuild = await mapDiscordGuild(
      Promise.resolve(discordGuildFirestoreData['xA40abnyBq6qQHSYmtHj']!)
    )
    expect(fetchedDiscordGuild).toEqual(discordGuilds['xA40abnyBq6qQHSYmtHj'])
  })
})
