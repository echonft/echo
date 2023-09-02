import { getAllUsers } from '../../../src/crud/user/get-all-users'
import { getAllUserMocks } from '../../mocks/get-all-user-mocks'
import { getUserMockById } from '../../mocks/get-user-mock-by-id'
import { tearDownRemoteFirestoreTests } from '../../test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '../../test-utils/tear-up-remote-firestore-tests'
import { User } from '@echo/firestore-types'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { forEach } from 'ramda'

describe('CRUD - user - getAllUsers', () => {
  beforeAll(tearUpRemoteFirestoreTests)
  afterAll(tearDownRemoteFirestoreTests)

  it('get all users', async () => {
    const userMocks = getAllUserMocks()
    const users = await getAllUsers()
    expect(users.length).toEqual(userMocks.length)
    forEach((user: User) => {
      expect(getUserMockById(user.id)).toStrictEqual(user)
    }, users)
  })
})
