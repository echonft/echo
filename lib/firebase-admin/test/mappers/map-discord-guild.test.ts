import { discordGuilds } from '../../../mocks/src/discord-guild/discord-guild'
import { discordGuildFirestoreData } from '../../../mocks/src/discord-guild/discord-guild-firestore-data'
import { mapDiscordGuild } from '@echo/firestore'
import { describe, expect, it } from '@jest/globals'

describe('mappers - mapDiscordGuild', () => {
  it('correct mapping', async () => {
    const fetchedDiscordGuild = await mapDiscordGuild(
      Promise.resolve(discordGuildFirestoreData['xA40abnyBq6qQHSYmtHj']!)
    )
    expect(fetchedDiscordGuild).toEqual(discordGuilds['xA40abnyBq6qQHSYmtHj'])
  })
})
