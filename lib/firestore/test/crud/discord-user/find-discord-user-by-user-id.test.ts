import { findDiscordUserByUserId } from '@echo/firestore/crud/discord-user/find-discord-user-by-user-id'
import { getDiscordUserMockById } from '@echo/firestore-mocks/get-discord-user-mock-by-id'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'

describe('CRUD - discord-user - findDiscordUserByUserId', () => {
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await tearDownRemoteFirestoreTests()
  })

  it('returns undefined if the discord user is not found', async () => {
    const user = await findDiscordUserByUserId('not-found')
    expect(user).toBeUndefined()
  })

  it('returns the discord user with the given discord id', async () => {
    const user = await findDiscordUserByUserId('6rECUMhevHfxABZ1VNOm')
    expect(user).toStrictEqual(getDiscordUserMockById('be5KGz2BfBRYbA1mCKQp'))
  })
})
