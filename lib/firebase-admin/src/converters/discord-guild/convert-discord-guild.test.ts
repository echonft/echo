import { getFirestoreDiscordGuildData } from '../../data/discord-guild/get-firestore-discord-guild-data'
import { discordGuildData } from '../../utils/test/mocks/discord-guild/discord-guild-data'
import { describe, expect, it } from '@jest/globals'

describe('convertDiscordGuild', () => {
  it('correct conversion', async () => {
    const discordGuild = await getFirestoreDiscordGuildData('xA40abnyBq6qQHSYmtHj')
    expect(discordGuild).toEqual(discordGuildData)
  })
})
