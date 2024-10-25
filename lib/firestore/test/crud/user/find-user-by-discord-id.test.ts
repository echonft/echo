import { getUserByDiscordId } from '@echo/firestore/crud/user/get-user-by-discord-id'
import { userDocumentMockCrew } from '@echo/firestore/mocks/user-document-mock'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - user - findUserByDiscordId', () => {
  it('returns undefined if the user is not found', async () => {
    const user = await getUserByDiscordId('not-found')
    expect(user).toBeUndefined()
  })
  it('returns the user with the given id', async () => {
    const user = await getUserByDiscordId(userDocumentMockCrew.discord.id)
    expect(user).toBeDefined()
    expect(user).toStrictEqual(userDocumentMockCrew)
  })
})
