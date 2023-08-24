import { getAllUsers } from '../../src/crud/user/get-all-users'
import { User } from '../../src/types/model/user'
import { getAllUserMocks } from '../mocks/get-all-user-mocks'
import { getUserMockById } from '../mocks/get-user-mock-by-id'
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
