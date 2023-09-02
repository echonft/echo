import { addUser } from '../../../src/crud/user/add-user'
import { deleteUser } from '../../../src/crud/user/delete-user'
import { findUserById } from '../../../src/crud/user/find-user-by-id'
import { getUserMockById } from '../../mocks/get-user-mock-by-id'
import { expectDateIsNow } from '../../test-utils/expect-date-is-now'
import { tearDownRemoteFirestoreTests } from '../../test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '../../test-utils/tear-up-remote-firestore-tests'
import { afterAll, afterEach, beforeAll, describe, expect, it } from '@jest/globals'

describe('CRUD - user - addUser', () => {
  let id: string
  beforeAll(tearUpRemoteFirestoreTests)
  afterAll(tearDownRemoteFirestoreTests)
  afterEach(async () => {
    try {
      await deleteUser(id)
    } catch (_err) {
      // listing was never created, test must have failed
    }
  })

  it('add  a user', async () => {
    const { discordAvatar, discordBanner, discordId, discordUsername, discordGuilds } =
      getUserMockById('6rECUMhevHfxABZ1VNOm')
    id = await addUser({ discordAvatar, discordBanner, discordId, discordUsername, discordGuilds })
    const newUser = await findUserById(id)
    expect(newUser!.discordAvatar).toStrictEqual(discordAvatar)
    expect(newUser!.discordBanner).toStrictEqual(discordBanner)
    expect(newUser!.discordId).toStrictEqual(discordId)
    expect(newUser!.discordUsername).toStrictEqual(discordUsername)
    expect(newUser!.wallets).toStrictEqual([])
    expect(newUser!.discordGuilds).toStrictEqual(discordGuilds)
    expect(newUser!.nonce).toBeUndefined()
    expectDateIsNow(newUser!.nftsUpdatedAt)
    expectDateIsNow(newUser!.updatedAt)
  })
})
