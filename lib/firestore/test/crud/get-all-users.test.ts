import { getAllUsers } from '../../src/crud/user/get-all-users'
import { initialize } from '../../src/services/initialize'
import { terminate } from '../../src/services/terminate'
import { userMock } from '../mocks/user-mock'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'

describe('CRUD - user - getAllUsers', () => {
  beforeAll(initialize)
  afterAll(terminate)

  it('get all users', async () => {
    const users = await getAllUsers()
    expect(users.length).toEqual(2)
    expect(users[0]).toStrictEqual(userMock['6rECUMhevHfxABZ1VNOm'])
    expect(users[1]).toStrictEqual(userMock['oE6yUEQBPn7PZ89yMjKn'])
  })
})
