import { userIsInGuild } from '../../src/utils/handler/user-is-in-guild'
import { discordGuildFirestoreData, userFirestoreData } from '@echo/firestore'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'

jest.mock('@echo/firebase-admin')

describe('utils - handler - userIsInGuild', () => {
  const user = userFirestoreData['oE6yUEQBPn7PZ89yMjKn']!
  const discord = discordGuildFirestoreData['ncUnbpFfVCofV9bD7ctn']!
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('if user is not in guild, returns false', () => {
    expect(userIsInGuild({ ...user, discordGuilds: [] }, discord)).toBeFalsy()
    expect(userIsInGuild({ ...user, discordGuilds: undefined }, discord)).toBeFalsy()
    expect(userIsInGuild(user, { ...discord, discordId: '0' })).toBeFalsy()
  })
  it('if user is in guild, returns true', () => {
    expect(userIsInGuild(user, discord)).toBeTruthy()
    expect(userIsInGuild(user, { ...discord, discordId: '1' })).toBeTruthy()
  })
})
