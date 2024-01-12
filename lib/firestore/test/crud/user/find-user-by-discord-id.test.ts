import { findUserByDiscordId } from '@echo/firestore/crud/user/find-user-by-discord-id'
import { tearDownRemoteFirestoreTests } from '@echo/firestore-test/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@echo/firestore-test/tear-up-remote-firestore-tests'
import { expectUserToEqualMock } from '@echo/firestore-test/user/expect-user-to-equal-mock'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'

describe('CRUD - user - findUserByDiscordId', () => {
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await tearDownRemoteFirestoreTests()
  })

  it('returns undefined if the user is not found', async () => {
    const user = await findUserByDiscordId('not-found')
    expect(user).toBeUndefined()
  })

  it('returns the user with the given id', async () => {
    const user = await findUserByDiscordId('462798252543049728')
    expectUserToEqualMock(user)
  })
})
