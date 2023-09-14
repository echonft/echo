import { getAllUsers } from '@echo/firestore/crud/user/get-all-users'
import type { FirestoreUser } from '@echo/firestore/types/model/firestore-user'
import { getAllUserMocks } from '@echo/firestore-mocks/get-all-user-mocks'
import { getUserMockById } from '@echo/firestore-mocks/get-user-mock-by-id'
import { expect } from '@jest/globals'
import { forEach } from 'ramda'

export async function assertUsers() {
  const userMocks = getAllUserMocks()
  const users = await getAllUsers()
  expect(users.length).toEqual(userMocks.length)
  forEach((user: FirestoreUser) => {
    expect(getUserMockById(user.id)).toStrictEqual(user)
  }, users)
}
