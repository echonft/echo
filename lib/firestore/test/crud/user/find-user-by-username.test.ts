import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { userDocumentMockJohnny } from '@echo/firestore/mocks/user-document-mock'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - user - findUserByUsername', () => {
  it('returns undefined if the user is not found', async () => {
    const user = await getUserByUsername('not-found')
    expect(user).toBeUndefined()
  })
  it('returns the user with the given username', async () => {
    const user = await getUserByUsername(userDocumentMockJohnny.username)
    expect(user).toBeDefined()
    expect(user).toStrictEqual(userDocumentMockJohnny)
  })
})
