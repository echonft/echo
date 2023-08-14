import { getFirestoreDiscordGuildData } from '../../../src/data/discord-guild/get-firestore-discord-guild-data'
import { discordGuildFirestoreData } from '../../mocks/discord-guild/discord-guild-firestore-data'
import { describe, expect, it } from '@jest/globals'

describe('convertDiscordGuild', () => {
  it('correct conversion', async () => {
    const discordGuild = await getFirestoreDiscordGuildData('xA40abnyBq6qQHSYmtHj')
    expect(discordGuild).toEqual(discordGuildFirestoreData['xA40abnyBq6qQHSYmtHj'])
  })
})
