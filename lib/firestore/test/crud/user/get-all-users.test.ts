import type { UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import { getAllUserDocumentDataMocks } from '@echo/firestore-mocks/user/get-all-user-document-data-mocks'
import { expectUserDocumentDataToEqualMock } from '@echo/firestore-test/user/expect-user-document-data-to-equal-mock'
import { getAllUsers } from '@echo/firestore-test/user/get-all-users'
import { describe, expect, it } from '@jest/globals'
import { forEach } from 'ramda'

describe('CRUD - user - getAllUsers', () => {
  it('get all users', async () => {
    const userMocks = getAllUserDocumentDataMocks()
    const users = await getAllUsers()
    expect(users.length).toEqual(userMocks.length)
    forEach((user: UserDocumentData) => {
      expectUserDocumentDataToEqualMock(user)
    }, users)
  })
})
