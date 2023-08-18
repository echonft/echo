import { findUserByDiscordId } from '../../../src/crud/user/find-user-by-discord-id'
import { initialize } from '../../../src/services/initialize'
import { terminate } from '../../../src/services/terminate'
import { userMock } from '../../mocks/user-mock'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'

describe('CRUD - user - findUserByDiscordId', () => {
  beforeAll(initialize)
  afterAll(terminate)

  it('throws an error if the user is not found', async () => {
    try {
      await findUserByDiscordId('not-found')
      expect(false).toBeTruthy()
    } catch (error) {
      expect(error).toBeDefined()
    }
  })

  it('returns the user with the given discord id', async () => {
    const user = await findUserByDiscordId('884593489189433364')
    expect(user).toStrictEqual(userMock['6rECUMhevHfxABZ1VNOm'])
  })
})
