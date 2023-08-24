import { getAllUsers } from '../../src/crud/user/get-all-users'
import { User } from '../../src/types/model/user'
import { getAllUserMocks } from '../mocks/get-all-user-mocks'
import { getUserMockById } from '../mocks/get-user-mock-by-id'
import { expect } from '@jest/globals'
import { equals, forEach } from 'ramda'

export async function assertUsers() {
  const userMocks = getAllUserMocks()
  const users = await getAllUsers()
  expect(users.length).toEqual(userMocks.length)
  forEach((user: User) => {
    const userId = user.id
    if (!equals(user, getUserMockById(userId))) {
      throw Error(`user ${userId} is different from mock`)
    }
  }, users)
}
