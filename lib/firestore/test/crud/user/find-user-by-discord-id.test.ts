import { getUserByDiscordId } from '@echo/firestore/crud/user/get-user-by-discord-id'
import { getUserDocumentDataMockByUsername } from '@echo/firestore/mocks/user/get-user-document-data-mock-by-username'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - user - findUserByDiscordId', () => {
  it('returns undefined if the user is not found', async () => {
    const user = await getUserByDiscordId('not-found')
    expect(user).toBeUndefined()
  })

  it('returns the user with the given id', async () => {
    const user = await getUserByDiscordId('462798252543049728')
    expect(user).toBeDefined()
    expect(user).toStrictEqual(getUserDocumentDataMockByUsername(user!.username))
  })
})
