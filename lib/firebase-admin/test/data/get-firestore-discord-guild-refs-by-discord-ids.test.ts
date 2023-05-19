import { getFirestoreDiscordGuildRefsByDiscordIds } from '../../src/data/discord-guild/get-firestore-discord-guild-refs-by-discord-ids'
import { discordGuildReferences } from '../mocks/discord-guild/discord-guild-reference'
import { describe, expect, it } from '@jest/globals'

describe('data - discordGuild - buildUser', () => {
  const discordGuilds = ['1', '100']
  const discordGuildReferencesArray = [
    discordGuildReferences['xA40abnyBq6qQHSYmtHj'],
    discordGuildReferences['ncUnbpFfVCofV9bD7ctn']
  ]
  it('returns empty if empty array', async () => {
    const result = await getFirestoreDiscordGuildRefsByDiscordIds([])
    expect(result).toStrictEqual([])
  })
  it('returns empty if wrong id', async () => {
    const result = await getFirestoreDiscordGuildRefsByDiscordIds(['0'])
    expect(result).toStrictEqual([])
  })
  it('returns refs with 1 guild', async () => {
    const result = await getFirestoreDiscordGuildRefsByDiscordIds(['1'])
    expect(result).toBeDefined()
    result?.map((guildRef, index) => expect(guildRef.path).toBe(discordGuildReferencesArray[index]!.path))
  })
  it('returns refs with multiple guild', async () => {
    const result = await getFirestoreDiscordGuildRefsByDiscordIds(discordGuilds)
    expect(result).toBeDefined()
    result?.map((guildRef, index) => expect(guildRef.path).toBe(discordGuildReferencesArray[index]!.path))
  })
  it('returns refs with multiple guild and an invalid one', async () => {
    const result = await getFirestoreDiscordGuildRefsByDiscordIds([...discordGuilds, '0'])
    expect(result).toBeDefined()
    result?.map((guildRef, index) => expect(guildRef.path).toBe(discordGuildReferencesArray[index]!.path))
  })
})
