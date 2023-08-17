import { findUserById } from '../../src/crud/user/find-user-by-id'
import { initialize } from '../../src/services/initialize'
import { terminate } from '../../src/services/terminate'
import { userMock } from '../mocks/user-mock'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'

describe('CRUD - user - findUserById', () => {
  beforeAll(initialize)
  afterAll(terminate)

  it('throws an error if the user is not found', async () => {
    try {
      await findUserById('not-found')
      expect(false).toBeTruthy()
    } catch (error) {
      expect(error).toBeDefined()
    }
  })

  it('returns the user with the given id', async () => {
    const user = await findUserById('oE6yUEQBPn7PZ89yMjKn')
    expect(user).toStrictEqual(userMock['oE6yUEQBPn7PZ89yMjKn'])
  })
})
