import { getAllUsers } from '@echo/firestore/crud/user/get-all-users'
import { getAllUserDocumentDataMocks } from '@echo/firestore/mocks/user/get-all-user-document-data-mocks'
import { eqList } from '@echo/utils/fp/eq-list'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - user - getAllUsers', () => {
  it('get all users', async () => {
    const userMocks = getAllUserDocumentDataMocks()
    const users = await getAllUsers()
    expect(eqList(users, userMocks)).toBeTruthy()
  })
})
