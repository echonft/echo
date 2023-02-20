import { getFirestoreDiscordGuildData } from '../../data/discord-guild/get-firestore-discord-guild-data'
import { discordGuild } from '../../utils/test/mocks/discord-guild/discord-guild'
import { mapDiscordGuild } from '@echo/firestore'
import { describe, expect, it } from '@jest/globals'
import { pipe } from 'ramda'

describe('mapDiscordGuild', () => {
  it('correct mapping', async () => {
    const fetchedDiscordGuild = await pipe(getFirestoreDiscordGuildData, mapDiscordGuild)('xA40abnyBq6qQHSYmtHj')
    expect(fetchedDiscordGuild).toEqual(discordGuild)
  })
})
