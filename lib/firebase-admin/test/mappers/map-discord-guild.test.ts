import { discordGuildFirestoreData, mapDiscordGuild } from '@echo/firestore'
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
