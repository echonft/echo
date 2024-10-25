import { getUserById } from '@echo/firestore/crud/user/get-user-by-id'
import { getUserDocumentDataMockByUsername } from '@echo/firestore/mocks/db-model/user/get-user-document-data-mock-by-username'
import { userMockJohnnyId } from '@echo/firestore/mocks/db-model/user/user-document-data-mock'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - user - findUserById', () => {
  it('returns undefined if the user is not found', async () => {
    const user = await getUserById('not-found')
    expect(user).toBeUndefined()
  })
  it('returns the user with the given id', async () => {
    const user = await getUserById(userMockJohnnyId())
    expect(user).toBeDefined()
    expect(user).toStrictEqual(getUserDocumentDataMockByUsername(user!.username))
  })
})
