import { getAllDiscordUsers } from '@echo/firestore/crud/discord-user/get-all-discord-users'
import type { FirestoreDiscordUser } from '@echo/firestore/types/model/firestore-discord-user'
import { getAllDiscordUserMocks } from '@echo/firestore-mocks/get-all-discord-user-mocks'
import { getDiscordUserMockById } from '@echo/firestore-mocks/get-discord-user-mock-by-id'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'
import { forEach } from 'ramda'

describe('CRUD - discord-user - getAllDiscordUsers', () => {
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await tearDownRemoteFirestoreTests()
  })

  it('get all discord users', async () => {
    const discordUserMocks = getAllDiscordUserMocks()
    const discordUsers = await getAllDiscordUsers()
    expect(discordUsers.length).toEqual(discordUserMocks.length)
    forEach((discordUser: FirestoreDiscordUser) => {
      expect(getDiscordUserMockById(discordUser.id)).toStrictEqual(discordUser)
    }, discordUsers)
  })
})
