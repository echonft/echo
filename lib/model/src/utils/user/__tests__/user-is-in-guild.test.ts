import { discordGuilds } from '../../../mocks/discord-guild'
import { users } from '../../../mocks/user'
import { DiscordGuild } from '../../../types/discord-guild'
import { userIsInGuild } from '../user-is-in-guild'
import { describe, expect, test } from '@jest/globals'

describe('User is in guild', () => {
  const user = users['oE6yUEQBPn7PZ89yMjKn']!
  const discordGuild = discordGuilds['ncUnbpFfVCofV9bD7ctn']!
  const firstGuild = { ...discordGuilds['ncUnbpFfVCofV9bD7ctn']!, discordId: 'test' }
  const secondGuild = { ...discordGuilds['ncUnbpFfVCofV9bD7ctn']!, discordId: 'testy' }

  test('User with no guilds always returns false', () => {
    const emptyGuildUser = { ...user, discordGuilds: [] }
    expect(userIsInGuild(emptyGuildUser, discordGuild)).toBeFalsy()
    expect(userIsInGuild(emptyGuildUser, undefined as unknown as DiscordGuild)).toBeFalsy()
  })
  test('User with guilds returns false if guild is not present', () => {
    expect(userIsInGuild(user, firstGuild)).toBeFalsy()
    expect(userIsInGuild(user, secondGuild)).toBeFalsy()
  })
  test('User with guilds returns true if guild is present', () => {
    expect(userIsInGuild(user, discordGuild)).toBeTruthy()
    const userWithGuilds = { ...user, discordGuilds: [discordGuild, firstGuild] }
    expect(userIsInGuild(userWithGuilds, discordGuild)).toBeTruthy()
    expect(userIsInGuild(userWithGuilds, firstGuild)).toBeTruthy()
    expect(userIsInGuild(userWithGuilds, secondGuild)).toBeFalsy()
  })
})
