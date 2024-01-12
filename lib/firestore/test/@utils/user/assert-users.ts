import type { User } from '@echo/firestore/types/model/user/user'
import { getAllUserMocks } from '@echo/firestore-mocks/user/get-all-user-mocks'
import { expectUserToEqualMock } from '@echo/firestore-test/user/expect-user-to-equal-mock'
import { getAllUsers } from '@echo/firestore-test/user/get-all-users'
import { expect } from '@jest/globals'
import { forEach } from 'ramda'

export async function assertUsers() {
  const userMocks = getAllUserMocks()
  const users = await getAllUsers()
  expect(users.length).toEqual(userMocks.length)
  forEach((user: User) => {
    expectUserToEqualMock(user)
  }, users)
}
