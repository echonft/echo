import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { getUserDocumentDataMockByUsername } from '@echo/firestore/mocks/db-model/user/get-user-document-data-mock-by-username'
import { userMockJohnnyUsername } from '@echo/model/mocks/user-mock'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - user - findUserByUsername', () => {
  it('returns undefined if the user is not found', async () => {
    const user = await getUserByUsername('not-found')
    expect(user).toBeUndefined()
  })
  it('returns the user with the given username', async () => {
    const user = await getUserByUsername(userMockJohnnyUsername())
    expect(user).toBeDefined()
    expect(user).toStrictEqual(getUserDocumentDataMockByUsername(user!.username))
  })
})
