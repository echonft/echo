import { findUserByDiscordId } from '../../../src/crud/user/find-user-by-discord-id'
import { userMock } from '../../mocks/user-mock'
import { tearDownRemoteFirestoreTests } from '../../test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '../../test-utils/tear-up-remote-firestore-tests'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'

describe('CRUD - user - findUserByDiscordId', () => {
  beforeAll(tearUpRemoteFirestoreTests)
  afterAll(tearDownRemoteFirestoreTests)

  it('returns undefined if the user is not found', async () => {
    const user = await findUserByDiscordId('not-found')
    expect(user).toBeUndefined()
  })

  it('returns the user with the given discord id', async () => {
    const user = await findUserByDiscordId('884593489189433364')
    expect(user).toStrictEqual(userMock['6rECUMhevHfxABZ1VNOm'])
  })
})
