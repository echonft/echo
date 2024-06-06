import { getUserByDiscordId } from '@echo/firestore/crud/user/get-user-by-discord-id'
import { expectUserDocumentDataToEqualMock } from '@echo/firestore-test/user/expect-user-document-data-to-equal-mock'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - user - findUserByDiscordId', () => {
  it('returns undefined if the user is not found', async () => {
    const user = await getUserByDiscordId('not-found')
    expect(user).toBeUndefined()
  })
  // eslint-disable-next-line jest/expect-expect
  it('returns the user with the given id', async () => {
    const user = await getUserByDiscordId('462798252543049728')
    expectUserDocumentDataToEqualMock(user)
  })
})
