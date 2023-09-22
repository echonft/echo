import { getAllUsers } from '@echo/firestore/crud/user/get-all-users'
import type { FirestoreUser } from '@echo/firestore/types/model/user/firestore-user'
import { getAllUserMocks } from '@echo/firestore-mocks/user/get-all-user-mocks'
import { getUserMockById } from '@echo/firestore-mocks/user/get-user-mock-by-id'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'
import { forEach } from 'ramda'

describe('CRUD - user - getAllUsers', () => {
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await tearDownRemoteFirestoreTests()
  })

  it('get all users', async () => {
    const userMocks = getAllUserMocks()
    const users = await getAllUsers()
    expect(users.length).toEqual(userMocks.length)
    forEach((user: FirestoreUser) => {
      expect(getUserMockById(user.id)).toStrictEqual(user)
    }, users)
  })
})
