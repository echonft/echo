import { DiscordGuild } from '../../../types/discord-guild'
import { generateMockGuild } from '../../tests/mocks/discord-guild/generate-mock-guild'
import { mockDiscordGuild } from '../../tests/mocks/discord-guild/mock-discord-guild'
import { mockUser } from '../../tests/mocks/user/mock-user'
import { userIsInGuild } from '../user-is-in-guild'
import { describe, expect, test } from '@jest/globals'

describe('User is in guild', () => {
  const user = mockUser
  const discordGuild = mockDiscordGuild

  test('User with no guilds always returns false', () => {
    const emptyGuildUser = { ...user, discordGuilds: [] }
    expect(userIsInGuild(emptyGuildUser, discordGuild)).toBeFalsy()
    expect(userIsInGuild(emptyGuildUser, undefined as unknown as DiscordGuild)).toBeFalsy()
  })
  test('User with guilds returns false if guild is not present', () => {
    const firstGuild = generateMockGuild({ discordId: 'test' })
    const secondGuild = generateMockGuild({ discordId: 'testy' })
    expect(userIsInGuild(user, firstGuild)).toBeFalsy()
    expect(userIsInGuild(user, secondGuild)).toBeFalsy()
  })
  test('User with guilds returns true if guild is present', () => {
    expect(userIsInGuild(user, discordGuild)).toBeTruthy()
    const firstGuild = generateMockGuild({ discordId: 'test' })
    const secondGuild = generateMockGuild({ discordId: 'testy' })
    const userWithGuilds = { ...user, discordGuilds: [mockDiscordGuild, firstGuild] }
    expect(userIsInGuild(userWithGuilds, discordGuild)).toBeTruthy()
    expect(userIsInGuild(userWithGuilds, firstGuild)).toBeTruthy()
    expect(userIsInGuild(userWithGuilds, secondGuild)).toBeFalsy()
  })
})
