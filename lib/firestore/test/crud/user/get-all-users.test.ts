import { getAllUsers } from '@echo/firestore/crud/user/get-all-users'
import { userDocumentMocks } from '@echo/test/firestore/mocks'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - user - getAllUsers', () => {
  it('get all users', async () => {
    const users = await getAllUsers()
    expect(users).toEqualList(userDocumentMocks)
  })
})
