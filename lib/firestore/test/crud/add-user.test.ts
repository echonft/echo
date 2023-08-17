import { addUser } from '../../src/crud/user/add-user'
import { deleteUser } from '../../src/crud/user/delete-user'
import { findUserById } from '../../src/crud/user/find-user-by-id'
import { initialize } from '../../src/services/initialize'
import { terminate } from '../../src/services/terminate'
import { userMock } from '../mocks/user-mock'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { omit } from 'ramda'

describe('CRUD - user - addUser/deleteUser', () => {
  beforeAll(initialize)
  afterAll(terminate)

  it('add and delete a user', async () => {
    const id = await addUser(omit(['id'], userMock['6rECUMhevHfxABZ1VNOm']!))
    const newUser = await findUserById(id)
    expect(newUser).toStrictEqual({ ...userMock['6rECUMhevHfxABZ1VNOm'], id })
    await deleteUser(id)
    try {
      await findUserById(id)
      expect(false).toBeTruthy()
    } catch (error) {
      expect(error).toBeDefined()
    }
  })
})
