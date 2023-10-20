import { type UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import { getAllUserMocks } from '@echo/firestore-mocks/user/get-all-user-mocks'
import { getUserMockById } from '@echo/firestore-mocks/user/get-user-mock-by-id'
import { expect } from '@jest/globals'
import { getAllUsers } from '@test-utils/user/get-all-users'
import { forEach } from 'ramda'

export async function assertUsers() {
  const userMocks = getAllUserMocks()
  const users = await getAllUsers()
  expect(users.length).toEqual(userMocks.length)
  forEach((user: UserDocumentData) => {
    expect(user).toStrictEqual(getUserMockById(user.id))
  }, users)
}
