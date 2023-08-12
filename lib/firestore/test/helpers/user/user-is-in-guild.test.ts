import { userIsInGuild } from '../../../src/helpers/user/user-is-in-guild'
import { discordGuildFirestoreData } from '../../mocks/discord-guild/discord-guild-firestore-data'
import { userFirestoreData } from '../../mocks/user/user-firestore-data'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'

describe('utils - handler - userIsInGuild', () => {
  const user = userFirestoreData['oE6yUEQBPn7PZ89yMjKn']!
  const discordGuild = discordGuildFirestoreData['ncUnbpFfVCofV9bD7ctn']!
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('if user is not in guild, returns false', () => {
    expect(userIsInGuild({ ...user, discordGuilds: [] }, discordGuild)).toBeFalsy()
    expect(userIsInGuild({ ...user, discordGuilds: undefined }, discordGuild)).toBeFalsy()
    expect(userIsInGuild(user, { ...discordGuild, discordId: '0' })).toBeFalsy()
  })
  it('if user is in guild, returns true', () => {
    expect(userIsInGuild(user, discordGuild)).toBeTruthy()
  })
})
