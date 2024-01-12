import type { User } from '@echo/firestore/types/model/user/user'
import { getAllUserMocks } from '@echo/firestore-mocks/user/get-all-user-mocks'
import { getUserMockById } from '@echo/firestore-mocks/user/get-user-mock-by-id'
import { getAllUsers } from '@echo/firestore-test/user/get-all-users'
import { expect } from '@jest/globals'
import { forEach } from 'ramda'

export async function assertUsers() {
  const userMocks = getAllUserMocks()
  const users = await getAllUsers()
  expect(users.length).toEqual(userMocks.length)
  forEach((user: User) => {
    expect(user).toStrictEqual(getUserMockById(user.id))
  }, users)
}
