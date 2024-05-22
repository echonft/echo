import { getAllUserDocumentDataMocks } from '@echo/firestore-mocks/user/get-all-user-document-data-mocks'
import { getAllUsers } from '@echo/firestore-test/user/get-all-users'
import { contentEq } from '@echo/utils/fp/content-eq'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - user - getAllUsers', () => {
  it('get all users', async () => {
    const userMocks = getAllUserDocumentDataMocks()
    const users = await getAllUsers()
    expect(contentEq(users, userMocks)).toBeTruthy()
  })
})
