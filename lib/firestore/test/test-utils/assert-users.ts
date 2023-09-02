import { getAllUsers } from '../../src/crud/user/get-all-users'
import { getAllUserMocks } from '../mocks/get-all-user-mocks'
import { getUserMockById } from '../mocks/get-user-mock-by-id'
import { User } from '@echo/firestore-types'
import { expect } from '@jest/globals'
import { forEach } from 'ramda'

export async function assertUsers() {
  const userMocks = getAllUserMocks()
  const users = await getAllUsers()
  expect(users.length).toEqual(userMocks.length)
  forEach((user: User) => {
    expect(getUserMockById(user.id)).toStrictEqual(user)
  }, users)
}
