import { addUser } from '../../../src/crud/user/add-user'
import { deleteUser } from '../../../src/crud/user/delete-user'
import { findUserById } from '../../../src/crud/user/find-user-by-id'
import { initialize } from '../../../src/services/initialize'
import { terminate } from '../../../src/services/terminate'
import { userMock } from '../../mocks/user-mock'
import { afterAll, afterEach, beforeAll, describe, expect, it } from '@jest/globals'

describe('CRUD - user - addUser', () => {
  let id: string
  beforeAll(initialize)
  afterAll(terminate)
  afterEach(async () => {
    try {
      await deleteUser(id)
    } catch (_err) {
      // listing was never created, test must have failed
    }
  })

  it('add  a user', async () => {
    const { discordAvatar, discordBanner, discordId, discordUsername, wallets, discordGuilds } =
      userMock['6rECUMhevHfxABZ1VNOm']!
    id = await addUser({ discordAvatar, discordBanner, discordId, discordUsername, wallets, discordGuilds })
    const newUser = await findUserById(id)
    expect(newUser.discordAvatar).toStrictEqual(discordAvatar)
    expect(newUser.discordBanner).toStrictEqual(discordBanner)
    expect(newUser.discordId).toStrictEqual(discordId)
    expect(newUser.discordUsername).toStrictEqual(discordUsername)
    expect(newUser.wallets).toStrictEqual(wallets)
    expect(newUser.discordGuilds).toStrictEqual(discordGuilds)
    expect(newUser.nonce).toBeUndefined()
    expect(newUser.updatedAt).toBeUndefined()
  })
})
